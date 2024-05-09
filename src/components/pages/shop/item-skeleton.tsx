import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ItemSkeleton = () => {
  return (
    <div className="relative flex w-full max-w-[230px] flex-col overflow-hidden rounded-lg border-gray-100 bg-white shadow-md border-2 hover:border-orange-400 hover:-translate-y-0.5">
            <div>
                <Skeleton className="relative flex w-full h-48 overflow-hidden"/>
                <div className="px-3 pb-3">
                    <Skeleton className="mt-2 h-6 w-full"/>
                    <div className="mt-2 flex flex-col">
                        <div className="flex items-center justify-between">
                            <Skeleton className="mt-2 h-6 w-full"/>
                        </div>
                        <Skeleton className="mt-2 h-6 w-full"/>
                    </div>
                </div>
                <div className="px-3 pb-2 text-xs flex items-center gap-1">
                    <Skeleton className="mt-2 h-5 w-24" />
                </div>
            </div>
        </div>
  )
}

export default ItemSkeleton