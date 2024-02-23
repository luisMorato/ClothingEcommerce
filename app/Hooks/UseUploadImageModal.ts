import { create } from "zustand";

type UploadImageModalStore = {
    IsOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useUploadImageModal = create<UploadImageModalStore>((set) => ({
    IsOpen: false,
    onOpen: () => set({ IsOpen: true }),
    onClose: () => set({ IsOpen: false })
}));

export default useUploadImageModal;