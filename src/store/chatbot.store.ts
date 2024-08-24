import { MessageType } from "@/types/chatbot";
import { create } from "zustand";

interface MessageState {
  messages: MessageType[];
  addMessage: (messageList: MessageType[]) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  addMessage: (messageList) =>
    set((state) => ({
      messages: messageList,
    })),
  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
