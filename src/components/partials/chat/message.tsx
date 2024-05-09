import React from 'react';

type msgType = {
    message: string;
    isBot: boolean;
};

const Message = ({ msg }: { msg: msgType }) => {
    if (msg.isBot) {
        return (
            <div>
                <div className="max-w-[80%] p-2 text-sm border inline-block m-1 rounded-xl">
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
