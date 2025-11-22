import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
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
    const baseStyles = 'inline-flex items-center justify-center font-light tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-electric-blue text-charcoal hover:glow-blue-sm active:scale-95',
      secondary: 'border border-electric-blue text-electric-blue hover:bg-electric-blue/10',
      ghost: 'text-white/70 hover:text-white hover:bg-white/5',
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
