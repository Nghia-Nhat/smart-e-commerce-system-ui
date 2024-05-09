import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function KeepInTouch() {
  return (
    <section className="w-full md:h-[80vh] py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-gray-300">
                Revolutionize Your Email Experience
              </h1>
              <p className="max-w-[600px] md:text-xl mx-auto">
                Join us and take control of your inbox. Fast, secure, and designed for modern life.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1 dark:bg-gray-800 dark:border-gray-900"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">
                  Newsletter
                </Button>
              </form>
              <p className="text-xs">
                Get ready to redefine your email experience.
                <Link className="underline underline-offset-2 " href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}