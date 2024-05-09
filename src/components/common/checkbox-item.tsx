"use client"

import { Checkbox } from "@/components/ui/checkbox"

type CheckBoxItemType = {
    id: string,
    label: string
}

export function CheckBoxItem({id, label} : CheckBoxItemType) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
