'use client';

import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginForm } from "@/types/login";
import { RegisterForm, RegisterResponse } from "@/types/register";
import Input from "@/components/form/Input";
import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import clsxm from "@/lib/clsxm";
import Link from "next/link";

export default function Register() {
    const methods = useForm<RegisterForm>({
        mode: 'onTouched',
    });
    const { handleSubmit } = methods;
    const router = useRouter();

    const registerMutation = useMutation<
        AxiosResponse,
        AxiosError<ApiError>,
        RegisterForm
    >({
        mutationFn: async (data: RegisterForm) => {
            return await api.post('/user', data);
        },
        onSuccess: () => {
            toast.success('Register success');
            router.push('/login');
        },
        onError: () => {
            toast.error('Register Failed');
        },
    });

    const onSubmit: SubmitHandler<RegisterForm> = (data) => {
        data.language = 'en';
        registerMutation.mutate(data);
    };

    return (
        <div className="flex flex-col pt-5">
            <h1 className="font-bold text-4xl text-center">Register Page</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className=" space-y-2 mt-3">
                        <Input
                            id='username'
                            label='Username'
                            placeholder='Input username'
                        />
                        <Input
                            id='name'
                            label='Name'
                            placeholder='Input name'
                        />
                        <Input
                            id='email'
                            label='Email'
                            placeholder='Input email'
                        />
                        <Input
                            id='password'
                            label='Password'
                            placeholder='Input password'
                            type='password'
                        />
                    </div>
                    <button 
                        type='submit'
                        className={clsxm(
                            'ring-1 ring-black',
                            'hover:ring-2',
                            'w-full',
                            'rounded-md py-2 text-center font-medium',
                        )}
                    >
                        Register
                    </button>
                </form>
            </FormProvider>
            <div className="flex gap-1">
                <p>Already have an account?</p>
                <Link href='/login'>Login</Link>
            </div>
        </div>
    );
}