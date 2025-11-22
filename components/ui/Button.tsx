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
    const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent/90 active:scale-95 shadow-lg shadow-accent/20',
      secondary: 'border-2 border-accent text-accent hover:bg-accent/10',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
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
