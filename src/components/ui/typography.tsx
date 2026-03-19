"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "~/lib/utils";

const headingVariants = cva(
  "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
  {
    variants: {
      variant: {
        default:
          "scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance",
        h1: "scroll-m-20 text-center text-3l md:text-4xl font-extrabold tracking-tight text-balance",
        h2: "scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const paragraphVariants = cva("leading-7 [&:not(:first-child)]:mt-6", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Heading({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "h1";

  return (
    <Comp
      data-slot="heading"
      data-variant={variant}
      className={cn(headingVariants({ variant, className }))}
      {...props}
    />
  );
}

function Paragraph({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "p";

  return (
    <Comp
      data-slot="heading"
      data-variant={variant}
      className={cn(paragraphVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants, Paragraph, paragraphVariants };
