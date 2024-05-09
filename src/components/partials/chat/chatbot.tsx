'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    ChatBubbleIcon,
    Cross1Icon,
    ImageIcon,
    PaperPlaneIcon,
} from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ChatInput } from '@/components/common/chat-input';

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const ChatBot = () => {
    const [showChat, setShowChat] = useState(false);

    const handleShowChat = () => {
        setShowChat(!showChat);
    };

    return (
        <>
            <div className="fixed right-0 bottom-[15vh] p-2 bg-orange-100 rounded-md">
                <Button
                    size="icon"
                    className="cursor-pointer rounded-sm"
                    onClick={handleShowChat}
                >
                    <ChatBubbleIcon className="h-5 w-5" />
                </Button>
            </div>

            {showChat && (
                <div className="rounded-md w-80 h-[70vh] fixed z-50 border bg-white right-0 bottom-[8vh] md:bottom-0">
                    {/* HEADER */}
                    <div className="flex justify-between p-1">
                        <div className="flex gap-3 items-center p-1">
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
                        <Button
                            variant="ghost"
                            onClick={handleShowChat}
                            size="icon"
                        >
                            <Cross1Icon className="h-4 w-4" />
                        </Button>
                    </div>
                    <Separator />

                    {/* BODY */}
                    <ScrollArea className="w-full h-[70%] p-2">
                        <div>
                            <div className="text-center">
                                <small>12:03</small>
                            </div>
                            <div className="max-w-[80%] p-2 text-sm border inline-block m-1 rounded-xl">
                                Hello, how can I help you?
                            </div>
                        </div>
                        <div>
                            <div className="text-center">
                                <small>12:04</small>
                            </div>
                            <div className="flex flex-row-reverse ">
                                <div className="py-2 p-2 text-sm bg-primary text-white border inline-block m-1 rounded-xl max-w-[80%]">
                                    Change the number of visible rows for a text
                                    area
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-center">
                                <small>12:05</small>
                            </div>
                            <div className="max-w-[80%] py-2 p-2 text-sm border inline-block m-1 rounded-xl">
                                Change the number of visible rows for a text
                                area First message
                            </div>
                        </div>
                    </ScrollArea>

                    {/* FOOTER */}
                    <div className="flex w-full items-end max-w-sm space-x-2 px-2">
                        {/* <Input type="text" placeholder="Type your message..." /> */}
                        <ChatInput
                            className="scrollbar-hide"
                            placeholder="Message..."
                            style={{ resize: 'none' }}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="aspect-square"
                        >
                            <PaperPlaneIcon />
                        </Button>
                        {/* <Textarea/> */}
                    </div>
                    <div className="flex justify-between px-2 mt-2">
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="aspect-square"
                        >
                            <ImageIcon />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
