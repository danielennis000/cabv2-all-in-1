import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string | React.ReactNode;
  error?: string;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, description, error, rightElement, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="font-arial font-bold text-body-default text-grey-2">
            {label}
          </label>
        )}
        {description && (
          <p className="font-arial text-body-default text-grey-2 leading-6">
            {description}
          </p>
        )}
        <div className="relative">
          <input
            className={clsx(
              "input-field w-full h-[42px]",
              rightElement && "pr-12",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="font-arial text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
