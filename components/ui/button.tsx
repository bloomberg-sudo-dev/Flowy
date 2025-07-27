import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold font-display uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary shadow-neon hover:shadow-terminal transform hover:scale-105 hover:text-shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-2 border-destructive shadow-[0_0_10px_currentColor] hover:shadow-[0_0_20px_currentColor] transform hover:scale-105",
        outline:
          "border-2 border-primary bg-background/10 backdrop-blur-sm text-primary hover:bg-primary/20 hover:text-primary shadow-[inset_0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_15px_currentColor] transform hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-secondary shadow-[0_0_10px_currentColor] hover:shadow-[0_0_20px_currentColor] transform hover:scale-105",
        ghost: "hover:bg-accent/20 hover:text-accent border-2 border-transparent hover:border-accent/50 hover:shadow-[0_0_10px_currentColor] transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline font-normal normal-case tracking-normal hover:text-shadow-glow",
        terminal: "bg-terminal-green/10 text-terminal-green border-2 border-terminal-green font-mono hover:bg-terminal-green/20 shadow-[0_0_10px_currentColor] hover:shadow-[0_0_20px_currentColor] transform hover:scale-105"
      },
      size: {
        default: "h-11 px-6 py-2 rounded-sm",
        sm: "h-9 px-4 rounded-sm text-xs",
        lg: "h-13 px-8 rounded-sm text-base",
        icon: "h-11 w-11 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Retro scan line effect */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:opacity-40 transition-opacity duration-200 pointer-events-none" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current/10 to-transparent" />
        </div>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
