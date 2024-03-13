'use client';

import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginForm, LoginResponse } from "@/types/login";
import Input from "@/components/form/Input";
import api from "@/lib/api";
import { setToken } from "@/lib/cookie";
import { ApiError, ApiResponse } from "@/types/api";
import useAuthStore from "@/stores/useAuthStore";
import clsxm from "@/lib/clsxm";
import Link from "next/link";

export default function Login() {
    const methods = useForm<LoginForm>({
        mode: 'onTouched',
    });
    const { handleSubmit } = methods;
    const { login } = useAuthStore();
    const router = useRouter();

    const loginMutation = useMutation<
        AxiosResponse,
        AxiosError<ApiError>,
        LoginForm
    >({
        mutationFn: async (data: LoginForm) => {
            const res = await api.post<ApiResponse<LoginResponse>>(
              '/user/login',
              data,
            );
            const { accessToken } = res.data;
            setToken(accessToken);
      
            if (res) login({ ...res.data.data.user, accessToken });
      
            return res;
          },
          onSuccess: () => {
            toast.success('Login success');
            router.push('/home');
          },
          onError: () => {
            toast.error('Login Failed');
          },
    });

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex flex-col px-96 pt-5">
            <h1 className="font-bold text-4xl text-center">Login Page</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className=" space-y-2 mt-3">
                        <Input
                            id='email'
                            label='Email'
                            placeholder='Input email'
                        />
                        <Input
                            id='password'
                            label='Password'
                            placeholder='Input password'
                            type="password"
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
                        Login
                    </button>
                </form>
            </FormProvider>
            <div className="flex gap-1">
                <p>Dont have an account?</p>
                <Link href='/register'>Register</Link>
            </div>
        </div>
    );
}