'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  unit?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, unit = '', value, onChange, min = -12, max = 12, step = 1, className = '', ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(value || 0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value)
      onChange?.(e)
    }

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-light text-white/70">{label}</label>
            {showValue && (
              <span className="text-sm font-light text-electric-blue">
                {currentValue}{unit}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-electric-blue
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:transition-all
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:hover:shadow-[0_0_10px_rgba(0,212,255,0.5)]
                       [&::-moz-range-thumb]:w-4
                       [&::-moz-range-thumb]:h-4
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-electric-blue
                       [&::-moz-range-thumb]:border-0
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:transition-all
                       [&::-moz-range-thumb]:hover:scale-110"
            {...props}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
