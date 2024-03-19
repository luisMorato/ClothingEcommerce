'use client';
import { useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';

import FancyInput from '@/app/Components/Layout/Inputs/FancyInput';
import Button from '@/app/Components/Layout/Button';
import { useRouter } from 'next/navigation';
import { UseFetch } from '@/app/Hooks/UseFetch';

type UserSettingsProps = {
    userProvider: string,
    userEmail: string,
    userName: string
}

const UserSettings = ({ 
    userProvider, 
    userEmail: email, 
    userName: name 
}: UserSettingsProps) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const { fetching } = UseFetch();

    const [isTwoFactorSelected, setIsTwoFactorSelected] = useState<boolean>();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            userName: name,
            userEmail: email,
            userPassword: '',
            userNewPassword: ''
        }
    });

    const PUT: SubmitHandler<FieldValues> = async (data) => {
        let updatedData = {
            ...data,
            twoFactor: isTwoFactorSelected
        };

        fetching(`${domain}/api/UpdateUserData`, "PUT", "application/json", updatedData);

        setTimeout(() => {
            router.refresh();
        }, 1500);
    }

    return(
        <div>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-5'>
                    <FancyInput
                        id='userName'
                        name='userName'
                        type='text'
                        register={register}
                        required={true}
                        errors={errors}
                        label='Name'
                    />
                    <FancyInput
                        id='userEmail'
                        name='userEmail'
                        type='email'
                        disabled={userProvider === 'github' || userProvider === 'google' ? true : false}
                        register={register}
                        required={userProvider === 'github' || userProvider === 'google' ? false : true}
                        errors={errors}
                        label='Email'
                    />
                    <FancyInput
                        id='userPassword'
                        name='userPassword'
                        type='password'
                        disabled={userProvider === 'github' || userProvider === 'google' ? true : false}
                        register={register}
                        required={userProvider === 'github' || userProvider === 'google' ? false : true}
                        errors={errors}
                        label='Password'
                    />
                    <FancyInput
                        id='userNewPassword'
                        name='userNewPassword'
                        type='password'
                        disabled={userProvider === 'github' || userProvider === 'google' ? true : false}
                        register={register}
                        errors={errors}
                        label='New Password'
                    />
                </div>
                <div className='border border-neutral-300 rounded-md py-2 px-4'>
                    <div className='flex items-center justify-between w-full mb-1'>
                        <h3 className='text-sm font-semibold'>Two Factor Authentication</h3>
                        <button
                            disabled={userProvider === 'github' || userProvider === 'google' ? true : false}
                        >
                            {isTwoFactorSelected ?
                                <BsToggle2On
                                    onClick={() => setIsTwoFactorSelected((PrevSelect) => !PrevSelect)}
                                    className='text-2xl text-neutral-400 cursor-pointer'
                                />
                                :
                                <BsToggle2Off
                                    onClick={() => setIsTwoFactorSelected((PrevSelect) => !PrevSelect)}
                                    className='text-2xl text-neutral-400 cursor-pointer'
                                />
                            }
                        </button>
                    </div>
                    <p className='text-sm text-neutral-600'>Enable Two Factor Authentication for your account</p>
                </div>
                <Button
                    id="saveChanges"
                    onClick={handleSubmit(PUT)}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default UserSettings;