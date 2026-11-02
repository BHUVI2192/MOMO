/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  isFullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconRight,
      isFullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-xs py-2 px-3.5 min-h-[36px] gap-1.5',
      md: 'text-sm py-2.5 px-5 min-h-[44px] gap-2 font-medium',
      lg: 'text-base py-3 px-6 min-h-[48px] gap-2.5 font-semibold',
    }[size];

    let variantClasses = '';

    if (variant === 'primary') {
      variantClasses =
        'bg-[#F6CD3B] text-[#14183A] border-[1.5px] border-[#14183A] rounded-[8px] transition-all duration-150 ' +
        'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard ' +
        'active:translate-x-0 active:translate-y-0 active:shadow-none';
    } else if (variant === 'secondary') {
      variantClasses =
        'bg-[#2F4BDB] text-[#FBF6E9] border-[1.5px] border-[#14183A] rounded-[8px] transition-all duration-150 ' +
        'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard ' +
        'active:translate-x-0 active:translate-y-0 active:shadow-none';
    } else if (variant === 'outline') {
      variantClasses =
        'bg-[#FBF6E9] text-[#14183A] border-[1.5px] border-[#14183A] rounded-[8px] transition-all duration-150 ' +
        'hover:bg-[#FBE9A0] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard ' +
        'active:translate-x-0 active:translate-y-0 active:shadow-none';
    } else if (variant === 'tertiary') {
      variantClasses =
        'bg-transparent text-[#14183A] p-0 min-h-0 font-medium inline-flex items-center gap-1.5 group ' +
        'hover:text-[#2F4BDB] transition-colors';
    }

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed hover:translate-x-0 hover:translate-y-0 hover:shadow-none pointer-events-none'
      : 'cursor-pointer';

    const widthClass = isFullWidth ? 'w-full justify-center' : '';

    if (variant === 'tertiary') {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={`inline-flex items-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] focus-visible:ring-offset-2 ${variantClasses} ${disabledClasses} ${widthClass} ${className}`}
          {...props}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="relative pb-0.5">
            {children}
            <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-current scale-x-100 origin-left transition-transform duration-200" />
          </span>
          {iconRight && (
            <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              {iconRight}
            </span>
          )}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BDB] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${disabledClasses} ${widthClass} ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
