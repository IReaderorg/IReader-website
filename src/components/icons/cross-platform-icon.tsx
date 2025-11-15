export function CrossPlatformIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Cross-Platform"
      role="img"
      {...props}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <rect x="14" y="7" width="6" height="10" rx="1" opacity="0.5" />
      <path d="M6 7h6M6 11h4" opacity="0.3" />
    </svg>
  );
}
