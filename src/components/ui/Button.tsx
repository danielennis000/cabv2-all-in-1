import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-arial font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-asu-maroon text-white hover:bg-opacity-90",
        secondary: "bg-grey-6 text-black hover:bg-grey-5",
        outline: "border border-grey-4 bg-white text-black hover:bg-grey-7",
        ghost: "text-grey-2 hover:bg-grey-7",
      },
      size: {
        sm: "h-7 px-3 text-sm",
        default: "h-[30px] px-4 text-sm",
        lg: "h-10 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
