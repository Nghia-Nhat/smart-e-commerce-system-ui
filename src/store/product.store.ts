import { create } from "zustand";

interface ProductState {
  imageFile: File | null;
  setImageFile: (file: File) => void;
}

const useProductStore = create<ProductState>((set) => ({
  imageFile: null as File | null,
  setImageFile: (file: File) =>
    set(() => ({
      imageFile: file,
    })),
}));

export default useProductStore;
