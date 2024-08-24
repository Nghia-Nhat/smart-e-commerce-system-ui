"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DiscordLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import Message from "./chat/message";
import Link from "next/link";
import { sendMessage } from "@/apiRequests/bot";
import { MessageType } from "@/types/chatbot";
import MessageSkeleton from "./chat/message-skeleton";
import useMessageStore from "@/store/chatbot.store";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

type SheetSideProps = {
  side: SheetSide;
};

export function ChatbotSheetSide({ side }: SheetSideProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage } = useMessageStore();

  const defaultMessage = {
    isBot: true,
    message: "Hello, how can I help you?",
  };
  const [messageArray, setMessageArray] = useState<MessageType[]>(() =>
    messages.length !== 0 ? messages : [defaultMessage],
  );

  // Auto scroll when getting a new message
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    addMessage(messageArray);
  }, [messageArray, addMessage]);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.value === "\n") return;
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      setMessage(textarea.value);
      // Send message
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    let newMessage = {
      isBot: false,
      message: message,
    };

    setMessageArray((prev) => [...prev, newMessage]);
    // Reset message input
    setMessage("");
    setIsLoading(true);
    handleSubmitMessage();
  };

  async function handleSubmitMessage() {
    try {
      const response = await sendMessage(message);
      if (response) {
        setIsLoading(false);
        const message = `${response.assistant}`;

        setMessageArray((prev) => [
          ...prev,
          {
            isBot: true,
            message,
          },
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      setMessageArray((prev) => [
        ...prev,
        {
          isBot: true,
          message:
            "Something went wrong! Please contact to our customer service at **support@triplee.com**.",
        },
      ]);
      console.log(error);
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <DiscordLogoIcon className="h-[1.2rem] w-[1.2rem] text-light" />
          </Button>
        </SheetTrigger>
        <SheetContent side={side} className="p-0">
          <SheetHeader>
            <SheetTitle>
              {/* HEADER */}
              <div className="flex gap-3 items-center p-4">
                <div className="text-center">
                  <div className="text-xl font-black md:ml-5">
                    <Link href="/">Triplee 🛒</Link>
                  </div>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Separator />

          {/* Content of messages */}
          <div className="relative w-full">
            <div className="h-[90vh]">
              <div
                ref={scrollRef}
                className="max-h-[80vh] overflow-y-auto p-4 pb-9 scrollbar-hide"
              >
                {messageArray.map((msg, index) => (
                  <Message key={index} msg={msg} />
                ))}
                {isLoading && <MessageSkeleton />}
              </div>
            </div>

            <div className="absolute flex bottom-0 right-0 left-0 m-4 gap-2 items-center">
              <Textarea
                className="scrollbar-hide resize-none bg-white"
                placeholder="Typing something..."
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              {message && (
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="aspect-square"
                  onClick={handleSendMessage}
                  title="Enter"
                >
                  <PaperPlaneIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
