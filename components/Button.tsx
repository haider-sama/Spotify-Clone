'use client';

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button 
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
        className={twMerge(`rounded-full w-full
        bg-green-400 border border-transparent
        px-4 py-4 disabled:cursor-not-allowed
        disabled:opacity-50 text-black font-bold
        hover:opacity-75 transition`, className)}>
            {children}
        </button>
    )
});
Button.displayName = "Button";


export default Button;