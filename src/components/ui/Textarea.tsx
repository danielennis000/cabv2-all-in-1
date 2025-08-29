import React from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string | React.ReactNode;
  error?: string;
  rightElement?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, error, rightElement, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="font-arial font-bold text-body-default text-grey-2">
            {label}
          </label>
        )}
        {description && (
          <div className="font-arial text-body-default text-grey-2 leading-6">
            {description}
          </div>
        )}
        <div className="relative">
          <textarea
            className={clsx(
              "text-area-field w-full min-h-[100px]",
              rightElement && "pr-12",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 bottom-4 flex items-center gap-4">
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
Textarea.displayName = "Textarea";

export { Textarea };
