"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/utils/cn";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch focus-visible:border-(--accent) focus-visible:ring-(--accent)/50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 data-checked:bg-(--foreground) data-unchecked:bg-(--neutral-dark)/30 border border-(--neutral-dark)/40 relative inline-flex shrink-0 items-center rounded-full transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 aria-invalid:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-(--background) pointer-events-none block rounded-full ring-0 transition-transform data-checked:bg-(--background) data-unchecked:bg-(--neutral) group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[14.8px] group-data-[size=sm]/switch:data-checked:translate-x-2.75 group-data-[size=default]/switch:data-unchecked:translate-x-[1.2px] group-data-[size=sm]/switch:data-unchecked:translate-x-px"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
