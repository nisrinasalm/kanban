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
import SEO from "@/components/SEO";

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
        <main className="flex flex-col justify-center items-center h-screen w-full">
            <SEO title="Login" description="Login Page" />
            <h1 className="font-bold text-4xl text-center mb-5">Login Page</h1>
            <div className="flex flex-col md:flex-row w-full items-center justify-center">
                <div className="hidden md:block md:w-1/2">
                    <h1 className="text-2xl text-center font-semibold">Welcome to Kanban Board</h1>
                </div>
                <div className="md:w-1/2 flex flex-col items-center">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full p-4 px-16">
                            <div className="space-y-2 mt-">
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
                                    'bg-[#54C4DB] text-white',
                                    'hover:bg-[#06B0D2] hover:text-white',
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
                        <Link
                            href='/register'
                            className={clsxm(
                                'text-[#54C4DB]',
                                'hover:text-[#06B0D2]',
                            )}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}