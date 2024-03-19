'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import FancyInput from "@/app/Components/Layout/Inputs/FancyInput";
import Modal from "@/app/Components/Modals/Modal";
import toast from 'react-hot-toast';

const NewPassword = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            NewPassowrd: ''
        }
    });

    const PUT: SubmitHandler<FieldValues> = async ({ NewPassowrd }) => {
        const url = `${domain}/api/NewPassword`;
        try {
            const response = await fetch(url, 
              {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({NewPassowrd, token}),
              }  
            );
            const resJson =  await response.json();
            if(resJson.success) {
                toast.success(resJson.success);
                router.push('/');
            }
            else toast.error(resJson.error);
        } catch (error) {
            console.log('error: ', error);
            toast.error('Something Went Wrong');
        }
    }

    const bodyContent: React.ReactElement = (
        <div>
            <h2 className='text-center font-bold my-4'>Choose Your New Password</h2>
            <FancyInput 
                id='NewPassowrd'
                name='NewPassowrd'
                type='password'
                label='New Password'
                required={true}
                register={register}
                errors={errors}
            />
        </div>
    );
    
    return (
        <div className="h-screen">
            <Modal
                isOpen={true}
                onClose={undefined}
                onSubmit={handleSubmit(PUT)}
                title="Reset Password"
                body={bodyContent}
                actionlabel="Reset Password"
            />
        </div>
    )
}

export default NewPassword;