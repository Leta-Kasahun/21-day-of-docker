export default function Loader() {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-600)]" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--paper-300)] border-t-[var(--brand-500)]" />
      Loading...
    </div>
  )
}
