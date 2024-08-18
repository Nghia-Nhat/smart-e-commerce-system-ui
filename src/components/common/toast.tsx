"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { HeartIcon } from "../icons/common"

export function ToastSimple({className, description} : any) {
  const { toast  } = useToast()

  return (
    <Button
      variant="ghost"
      className={className}
      size="icon"
      onClick={() => {
        toast({
          description,
        })
      }}
    >
      <HeartIcon/>
    </Button>
  )
}
