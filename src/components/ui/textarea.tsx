import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-xl border bg-[#171717] px-3.5 py-2.5 text-sm text-white transition-all outline-none",
        "placeholder:text-[#A1A1AA]",
        "border-[rgba(212,175,55,0.15)]",
        "focus-visible:border-[rgba(212,175,55,0.5)] focus-visible:ring-3 focus-visible:ring-[rgba(212,175,55,0.12)] focus-visible:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-[#EF4444] aria-invalid:ring-3 aria-invalid:ring-[rgba(239,68,68,0.2)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
