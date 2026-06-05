import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border border-transparent px-2 py-0.5 text-[10px] font-mono whitespace-nowrap transition-all focus-visible:border-(--accent) focus-visible:ring-[3px] focus-visible:ring-(--accent)/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 [&>svg]:pointer-events-none [&>svg]:size-3! [a]:cursor-pointer uppercase",
  {
    variants: {
      variant: {
        default: "bg-(--foreground) text-(--background) [a]:hover:opacity-90",
        secondary:
          "bg-(--neutral) text-(--background) [a]:hover:opacity-90",
        destructive:
          "bg-red-500/10 text-red-500 focus-visible:ring-red-500/20 [a]:hover:bg-red-500/20",
        outline:
          "border border-(--foreground)/20 text-(--foreground) [a]:hover:bg-(--foreground)/10",
        ghost:
          "hover:bg-(--foreground)/10 text-(--neutral)",
        link: "text-(--foreground) underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
