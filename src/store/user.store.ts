import { create } from 'zustand';

interface UserState {
    isLogin: boolean;
    setIsLogin: (flag: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    setIsLogin: (flag: boolean) =>
        set(() => ({
            isLogin: flag,
        })),
}));

export default useUserStore;
