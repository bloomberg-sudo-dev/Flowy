import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-sm border-2 border-primary/50 bg-card/80 backdrop-blur-sm text-card-foreground shadow-terminal hover:shadow-neon hover:border-primary transition-all duration-300 group overflow-hidden",
      className
    )}
    {...props}
  >
    {/* Scan lines overlay */}
    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
      <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    </div>
    
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-60" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent opacity-60" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent opacity-60" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent opacity-60" />
    
    {/* Content wrapper */}
    <div className="relative z-10">
      {props.children}
    </div>
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-primary/20", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-display font-bold uppercase tracking-wider leading-none text-primary retro-glow",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground font-mono opacity-80", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-primary/20", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
