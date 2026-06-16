import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border bg-[#171717] px-3.5 py-2 text-sm text-white transition-all outline-none",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-[#A1A1AA]",
        "border-[rgba(212,175,55,0.15)]",
        "focus-visible:border-[rgba(212,175,55,0.5)] focus-visible:ring-3 focus-visible:ring-[rgba(212,175,55,0.15)] focus-visible:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-[#EF4444] aria-invalid:ring-3 aria-invalid:ring-[rgba(239,68,68,0.2)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
