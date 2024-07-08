import { MessageType } from '@/types/chatbot';
import React from 'react';



const Message = ({ msg }: { msg: MessageType }) => {
    if (msg.isBot) {
        return (
            <div>
                <div className="max-w-[100%] p-3 text-sm border inline-block m-1 rounded-xl text-justify">
                    {msg.message}
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
