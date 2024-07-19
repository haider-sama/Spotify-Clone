import { create } from "zustand";

interface AuthUploadProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useUploadModal = create<AuthUploadProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useUploadModal;