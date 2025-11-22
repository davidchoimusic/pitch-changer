import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'play'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    className = '',
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent/90 active:scale-95 shadow-lg shadow-accent/20',
      secondary: 'border-2 border-accent text-accent hover:bg-accent/10',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
      play: `
        bg-gradient-to-br from-accent via-blue-500 to-blue-600
        text-white font-semibold
        shadow-[0_8px_16px_rgba(59,130,246,0.4),0_3px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
        hover:shadow-[0_12px_24px_rgba(59,130,246,0.5),0_6px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]
        hover:scale-105
        active:scale-95
        active:shadow-[0_4px_8px_rgba(59,130,246,0.3),0_2px_4px_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(0,0,0,0.2)]
        border-t border-white/20
        relative
        overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
      `,
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block animate-spin mr-2">⏳</span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
