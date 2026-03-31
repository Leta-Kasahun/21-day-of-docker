import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--brand-500)] text-white shadow-[0_10px_24px_-12px_rgba(192,80,32,0.75)] hover:bg-[var(--brand-600)]',
  secondary:
    'bg-[var(--paper-200)] text-[var(--ink-900)] hover:bg-[var(--paper-300)]',
  ghost: 'bg-transparent text-[var(--ink-700)] hover:bg-[var(--paper-200)]',
  danger: 'bg-[#d0452a] text-white hover:bg-[#b83a22]'
}

export default function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55'

  return (
    <button type={type} className={`${baseClass} ${variantClassMap[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
