import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Paper-adapted. Changes from the shadcn default, and why:
 *  - `rounded-lg` → `rounded-sm` (2px): paper has no rounded corners.
 *  - `h-8` → `h-10`: 32px is an app-density affordance; this is a document.
 *  - `transition-all` → explicit `colors` + `transform`: `all` animates
 *    properties we never intended, and costs a style recalc per frame.
 *  - `active:translate-y-px` → `active:scale-[0.97]`: scale is the press
 *    feedback that reads as the surface acknowledging the touch.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-150 ease-out-expo select-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper hover:bg-signal aria-expanded:bg-signal",
        outline:
          "border-rule bg-transparent text-ink hover:border-ink hover:bg-paper-raised aria-expanded:border-ink",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted aria-expanded:bg-muted",
        ghost: "text-ink-muted hover:bg-secondary hover:text-ink",
        destructive:
          "bg-destructive text-paper hover:bg-destructive/85",
        link: "text-ink underline-offset-4 hover:text-signal hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
