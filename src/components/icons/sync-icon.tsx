export function SyncIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
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
      aria-label="Sync"
      role="img"
      {...props}
    >
      <path d="M21.5 2v6h-6" />
      <path d="M2.5 22v-6h6" />
      <path d="M21.5 8A10 10 0 0 0 8.36 2.93l-1.86 1.86" opacity="0.5" />
      <path d="M2.5 16A10 10 0 0 0 15.64 21.07l1.86-1.86" opacity="0.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}
