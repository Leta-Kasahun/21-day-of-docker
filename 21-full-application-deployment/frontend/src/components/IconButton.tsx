import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonVariant = 'neutral' | 'success' | 'danger'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
  variant?: IconButtonVariant
}

const variantClassMap: Record<IconButtonVariant, string> = {
  neutral: 'text-[var(--ink-700)] hover:bg-[var(--paper-200)]',
  success: 'text-[#2f6f4f] hover:bg-[#daf2e8]',
  danger: 'text-[#b83a22] hover:bg-[#f9ddd5]'
}

export default function IconButton({
  icon,
  label,
  variant = 'neutral',
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${variantClassMap[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  )
}
