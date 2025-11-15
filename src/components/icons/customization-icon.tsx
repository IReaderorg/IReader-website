export function CustomizationIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
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
      aria-label="Customization"
      role="img"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M22 12h-4M6 12H2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
      <path d="M16.24 7.76l-2.12 2.12M9.88 14.12l-2.12 2.12M16.24 16.24l-2.12-2.12M9.88 9.88L7.76 7.76" opacity="0.5" />
    </svg>
  );
}
