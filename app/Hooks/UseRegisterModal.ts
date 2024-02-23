import { create } from 'zustand';

type registerModalStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useRegisterModal = create<registerModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useRegisterModal;