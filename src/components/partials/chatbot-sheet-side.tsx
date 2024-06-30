'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DiscordLogoIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import { useEffect, useRef, useState } from 'react';
import Message from './chat/message';
import Link from 'next/link';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

type SheetSideProps = {
    side: SheetSide;
};

export function ChatbotSheetSide({ side }: SheetSideProps) {
    const [message, setMessage] = useState('');

    const defaultMessage = {
        isBot: true,
        message: 'Hello, how can I help you?',
    };
    const [messageArray, setMessageArray] = useState([defaultMessage]);

    // Auto scroll when getting a new message
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messageArray]);

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
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
        setMessage('');
    };

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
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">
                                    Spy man
                                </span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <Separator />

                    {/* Content of messages */}
                    <div className="h-[80vh] md:h-[75vh]">
                        <div
                            ref={scrollRef}
                            className="max-h-[80vh] md:max-h-[75vh] overflow-y-auto p-4 pb-9 scrollbar-hide"
                        >
                            <div className="text-center py-5">
                                <div className="text-xl font-black md:ml-5">
                                    <Link href="/">Triplee 🛒</Link>
                                </div>
                            </div>
                            {messageArray.map((msg, index) => (
                                <Message key={index} msg={msg} />
                            ))}
                        </div>
                    </div>

                    <SheetFooter>
                        <div className="mb-5 md:mb-0 flex w-full items-end space-x-2 px-4">
                            <Textarea
                                className="scrollbar-hide resize-none"
                                placeholder="Ctrl + Enter to send..."
                                value={message}
                                onChange={handleMessageChange}
                                onKeyDown={handleKeyDown}
                            />
                            {message && (
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="aspect-square"
                                    onClick={handleSendMessage}
                                    title="Ctrl+ Enter"
                                >
                                    <PaperPlaneIcon className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
