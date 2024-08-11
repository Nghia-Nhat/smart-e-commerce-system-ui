import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MessageType } from '@/types/chatbot';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const Message = ({ msg }: { msg: MessageType }) => {
    if (msg.isBot) {
        return (
            <div>
                <div className='flex gap-4 items-center'>
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                    </Avatar>
                    <span className='text-sm font-bold'>Assistant</span>
                </div>
                <div className="max-w-[100%] p-3 text-sm inline-block m-1 rounded-xl">
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-row-reverse animate-slide-top">
            <div className="py-2 p-2 text-sm bg-primary text-white border inline-block m-1 rounded-xl max-w-[80%]">
                {msg.message}
            </div>
        </div>
    );
};

export default Message;
