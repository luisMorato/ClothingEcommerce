'use client';
import { 
    useState, 
    useTransition
} from "react";

import useUploadImageModal from "@/app/Hooks/UseUploadImageModal";

import Modal from "@/app/Components/Modals/Modal";

const UploadImageModal = () => {
    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState('');
    const UploadImageModal = useUploadImageModal();

    //ToDo:
    const uploadImage = async () => {
        
    }

    const bodyContent: React.ReactElement = (
        <div className="flex flex-col gap-y-3 py-2">
            <p className="font-medium">Select Your Photo</p>
            <input
                accept="image/*"
                type="file"
                disabled={isPending}
                onChange={(e) => {setImage(e.target.value)}}
                className="file:bg-neutral-200 file:py-2 file:cursor-pointer file:text-sm file:font-medium file:outline-none file:border-0 border file:mr-4 hover:file:bg-neutral-300 border-neutral-400 rounded-md text-sm"
            />
            <div>

            </div>
        </div>
    );

    return(
        <Modal
            isOpen={UploadImageModal.IsOpen}
            title="Upload Your Profile Image"
            body={bodyContent}
            onClose={UploadImageModal.onClose}
            onSubmit={uploadImage}
            actionlabel="Upload"
        />
    )
}

export default UploadImageModal;