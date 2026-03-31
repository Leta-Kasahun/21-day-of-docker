import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm text-[var(--ink-700)]" htmlFor={inputId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-[var(--paper-300)] bg-white px-3 py-2.5 text-[var(--ink-900)] outline-none transition focus:border-[var(--brand-500)] focus:ring-2 focus:ring-[var(--brand-100)] ${className}`}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-[#b83a22]">{error}</span> : null}
    </label>
  )
}
