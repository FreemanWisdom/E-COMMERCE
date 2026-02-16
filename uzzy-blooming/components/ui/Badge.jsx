export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ${className}`}
    >
      {children}
    </span>
  );
}
