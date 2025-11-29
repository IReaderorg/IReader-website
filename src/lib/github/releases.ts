import "server-only";

const GITHUB_RELEASES_API =
  "https://api.github.com/repos/IReaderorg/IReader/releases";

export interface GitHubAsset {
  readonly label: string;
  readonly url: string;
  readonly size: string;
  readonly sha256: string | null;
}

export interface GitHubRelease {
  readonly id: number;
  readonly name: string;
  readonly publishedAt: string;
  readonly publishedAtRaw: string;
  readonly tagName: string;
  readonly anchor: string;
  readonly assets: ReadonlyArray<GitHubAsset>;
  readonly notes: string;
}

interface GitHubReleaseResponse {
  readonly id: number;
  readonly name: string;
  readonly tag_name: string;
  readonly published_at: string;
  readonly body: string;
  readonly prerelease: boolean;
  readonly assets: ReadonlyArray<{
    readonly browser_download_url: string;
    readonly name: string;
    readonly size: number;
  }>;
}

export async function fetchReleases(): Promise<{
  releases: GitHubRelease[];
  updatedAt: string | null;
}> {
  const response = await fetch(GITHUB_RELEASES_API, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {
      revalidate: 60 * 15,
    },
  });

  if (!response.ok) {
    return { releases: [], updatedAt: null };
  }

  const json = (await response.json()) as GitHubReleaseResponse[];

  const releases = json.map((release) => {
    const sha256Map = parseSha256FromBody(release.body);
    return {
      id: release.id,
      name: release.name,
      tagName: release.tag_name,
      anchor: `release-${release.tag_name}`.replace(/[^a-zA-Z0-9-_]/gu, "-"),
      publishedAt: formatDate(release.published_at),
      publishedAtRaw: release.published_at,
      assets: release.assets.map((asset) => ({
        label: asset.name,
        url: asset.browser_download_url,
        size: formatFileSize(asset.size),
        sha256: sha256Map.get(asset.name) ?? null,
      })),
      notes: release.body,
    };
  });

  const updatedAt = releases[0]?.publishedAt ?? null;

  return { releases, updatedAt };
}

function formatDate(value: string): string {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function parseSha256FromBody(body: string): Map<string, string> {
  const sha256Map = new Map<string, string>();
  
  // Pattern for new format: "IReader-arm64-v8a.apksha256:hash" (filename directly followed by sha256:)
  const newFormatPattern = /([A-Za-z0-9_.-]+\.(?:apk|jar|msi|AppImage|deb|zip|gz))sha256:([a-f0-9]{64})/gi;
  
  // Pattern for table format: |filename|hash|
  const tablePattern = /\|([^|]+)\|([a-f0-9]{64})\|/gi;
  
  // Pattern for "filename | sha256:hash" format
  const pipePattern = /([^\s|]+)\s*\|\s*sha256:([a-f0-9]{64})/gi;
  
  let match;
  
  while ((match = newFormatPattern.exec(body)) !== null) {
    sha256Map.set(match[1], match[2]);
  }
  
  while ((match = tablePattern.exec(body)) !== null) {
    sha256Map.set(match[1].trim(), match[2]);
  }
  
  while ((match = pipePattern.exec(body)) !== null) {
    sha256Map.set(match[1], match[2]);
  }
  
  return sha256Map;
}
