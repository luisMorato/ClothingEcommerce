'use client';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AuthError } from 'next-auth';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import toast from 'react-hot-toast';
import React, { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import useRegisterModal from '@/app/Hooks/UseRegisterModal';
import useLoginModal from "@/app/Hooks/UseLoginModal";

import Modal from "@/app/Components/Modals/Modal";
import FancyInput from "@/app/Components/Layout/Inputs/FancyInput";
import Button from '@/app/Components/Layout/Button';

const RegisterModal = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Email Already in Use With Different Provider" : "";

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            registerNameInput: '',
            registerEmailInput: '',
            registerPasswordInput: ''
        }
    });

    const githubOrGoogleSignIn = (provider: "google" | "github") => {
        if(urlError !== ""){
            toast.error(urlError);
            return;
        }
        try {
            signIn(provider, {
                callbackUrl: '/',
            });
        } catch (error) {
            if(error instanceof AuthError){
                switch (error.type){
                    case 'OAuthAccountNotLinked':
                       toast.error("Email Already Taken!");
                       return;
                    default:
                        toast.error("Something went wrong!");
                        return;
                }
            }
        }
    }

    const POST: SubmitHandler<FieldValues> = async (data) => {
        const url = `${domain}/api/Register`;
        startTransition(async () => {
            try {
                const response = await fetch(url,
                    {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                const resJson = await response.json();
                if(resJson.success) toast.success(resJson.success);
                else toast.error(resJson.error);
            } catch (error) {
                console.log('error: ', error);
                toast.error('Something Went Wrong!');
            }
        });
    }

    const toggleToLogin = () => {
        registerModal.isOpen = false

        setTimeout(() => {
            loginModal.onOpen();
        }, 500);
    }

    const bodyContent: React.ReactElement = (
        <>
            <h2 className='text-xl text-start font-bold mt-2'>Welcome to <span className='text-rose-500'>LOGO</span></h2>
            <p className="text-sm text-center text-neutral-400 mb-6 mt-2">Create an Account</p>
            <div className="w-full">
                <div className=" flex flex-col gap-5">
                    <FancyInput
                        id="registerNameInput"
                        name='registerNameInput'
                        type="text"
                        label="Name"
                        required={true}
                        register={register}
                        errors={errors}
                    />
                    <FancyInput
                        id="registerEmailInput"
                        name="registerEmailInput"
                        type="email"
                        label="Email"
                        required={true}
                        register={register}
                        errors={errors}
                    />
                    <FancyInput
                        id="registerPasswordInput"
                        name="registerPasswordInput"
                        type="password"
                        label="Password"
                        required={true}
                        register={register}
                        errors={errors}
                    />
                </div>
            </div>
        </>
    );

    const footerContent: React.ReactElement = (
        <>
            <div className='flex flex-col gap-3 mt-6'>
                <hr />
                <Button
                    id='registerWithGoogle'
                    icon={FcGoogle}
                    outline
                    roundedMd
                    onClick={() => githubOrGoogleSignIn("google")}
                >
                    Continue With Google
                </Button>

                <Button
                    id='registerWithGithub'
                    icon={AiFillGithub}
                    outline
                    roundedMd
                    onClick={() => githubOrGoogleSignIn("github")}
                >
                    Continue With GitHub
                </Button>
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-sm mt-4'>Already Have an Account? <b onClick={toggleToLogin} className='hover:underline cursor-pointer'>Log In</b></p>
            </div>
        </>
    );
    
    return(
        <Modal 
            isOpen={registerModal.isOpen}
            title="Register"
            body={bodyContent}
            footer={footerContent}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(POST)}
            disabled={isPending}
            actionlabel='Continue'
        />
    )
}

export default RegisterModal;