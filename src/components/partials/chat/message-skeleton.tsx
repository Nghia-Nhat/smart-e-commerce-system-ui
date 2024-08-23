import { Avatar, AvatarImage } from "@/components/ui/avatar";
function MessageSkeleton() {
  return (
    <div>
    <div className="flex gap-4 items-center">
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <span className="text-sm font-bold">Tripleer</span>
    </div>
    <div className="flex flex-col gap-2 p-3 text-sm m-1 rounded-xl">
      <div className="h-5 w-full bg-slate-300 rounded-md animate-pulse"></div>
      <div className="h-5 w-[90%] bg-slate-300 rounded-md animate-pulse"></div>
      <div className="h-5 w-[70%] bg-slate-300 rounded-md animate-pulse"></div>
    </div>
  </div>
  )
}

export default MessageSkeleton