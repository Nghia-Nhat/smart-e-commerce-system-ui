import { create } from 'zustand';

interface ProductState {
    imageFile: File;
    setImageFile: (file: File) => void;
}

const useProductStore = create<ProductState>((set) => ({
    imageFile: new File([""], "empty"),
    setImageFile: (file: File) =>
        set(() => ({
            imageFile: file,
        })),
}));

export default useProductStore;
