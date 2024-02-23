'use client';
import { signIn } from 'next-auth/react';
import { useRouter, 
    useSearchParams 
} from 'next/navigation';
import { 
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { useState ,useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import useLoginModal from "@/app/Hooks/UseLoginModal";
import useRegisterModal from '@/app/Hooks/UseRegisterModal';

import Modal from "@/app/Components/Modals/Modal";
import FancyInput from "@/app/Components/Layout/Inputs/FancyInput";
import toast from 'react-hot-toast';
import Button from '@/app/Components/Layout/Button';
import { AuthError } from 'next-auth';

const LoginModal = () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;
    const router = useRouter();

    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Email Already in Use With Different Provider" : "";

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [forgotPswrd, setForgotPassword] = useState(false);

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            loginEmailInput: '',
            loginPasswordInput: ''
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
                redirect: false,
            });
        } catch (error) {
            if(error instanceof AuthError){
                switch (error.type){
                    case 'OAuthAccountNotLinked':
                       toast.error("Email Already in Use With Different Provider");
                       return;
                    default:
                        toast.error("Something went wrong");
                        return;
                }
            }
        }
        if(urlError !== ""){
            toast.error(urlError);
            router.push('/');
            return;
        }
    }

    const POST: SubmitHandler<FieldValues> = async (data) => {
        const url = `${domain}/api/Login`;
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
                if(resJson.error) toast.error(resJson.error);
                else {
                    toast.success(resJson.success);
                    router.refresh();
                }
            } catch (error) {
                console.log('error: ', error);
                toast.error('Something Went Wrong!');
            }
        });
    }

    const newPassword:SubmitHandler<FieldValues> = async ({ loginEmailInput }) => {
        const url = `${domain}/api/ResetPassword`;

        try {
            const response = await fetch(url, 
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(loginEmailInput),
                }
            );
            const resJson = await response.json();
    
            if(resJson.success) toast.success(resJson.success);
            else toast.error(resJson.error);
        } catch (error) {
            console.log('error: ', error);
            toast.error('Something Went Wrong!');
        }
    }

    const toggleToRegister = () => {
        loginModal.isOpen = false

        setTimeout(() => {
            registerModal.onOpen();
        }, 500);
    }

    const bodyContent: React.ReactElement = (
        !forgotPswrd ?
            (<>
                <h2 className='text-xl text-center font-bold mt-2'>Welcome Back</h2>
                <p className="text-sm text-center text-neutral-400 mb-6 mt-2">Login to Access the Plataform</p>
                <div className="w-full">
                    <div className="flex flex-col gap-5">
                        <FancyInput
                            id="loginEmailInput"
                            name="loginEmailInput"
                            type="email"
                            label="Email"
                            register={register}
                            required={true}
                            errors={errors}
                        />
                        <FancyInput
                            id="loginPasswordInput"
                            name="loginPasswordInput"
                            type="password"
                            label="Password"
                            register={register}
                            required={true}
                            errors={errors}
                        />
                    </div>
                </div>
                <p
                    onClick={() => {setForgotPassword(true)}}
                    className="text-sm text-start text-neutral-400 mt-3 hover:underline cursor-pointer w-fit">
                    Forgot Your Password?
                </p>
            </>)
        : 
            (<>
                <h2 className='text-lg text-center font-bold my-2'>Enter Your Email</h2>
                <FancyInput
                    id="loginEmailInput"
                    name="loginEmailInput"
                    type="email"
                    label="Email"
                    register={register}
                    required={true}
                    errors={errors}
                />
                <p
                    onClick={() => {setForgotPassword(false)}}
                    className="text-sm text-start text-neutral-400 mt-3 hover:underline cursor-pointer w-fit">
                    Back to Login.
                </p>
            </>)
    )

    const footerContent: React.ReactElement = (
        <>
            <div className='flex flex-col gap-3 mt-6'>
                <hr />
                <Button
                    id='registerWithGoogle'
                    icon={FcGoogle}
                    outline
                    roundedMd
                    onClick={() => githubOrGoogleSignIn('google')}
                >
                    Continue With Google
                </Button>

                <Button
                    id='registerWithGithub'
                    icon={AiFillGithub}
                    outline
                    roundedMd
                    onClick={() => githubOrGoogleSignIn('github')}
                >
                    Continue With GitHub
                </Button>
            </div>
            <div>
                <p className='text-center text-sm mt-4'>Don&apos;t have an Account? <b onClick={toggleToRegister} className='hover:underline cursor-pointer'>Sign Up</b></p>
            </div>
        </>
    )

    return(
        <Modal 
          isOpen={loginModal.isOpen}
          title="Login"
          body={bodyContent}
          footer={footerContent}
          onClose={loginModal.onClose}
          onSubmit={!forgotPswrd ? handleSubmit(POST) : handleSubmit(newPassword)}
          disabled={isPending}
          actionlabel='Submit'
        />
    )
}

export default LoginModal;