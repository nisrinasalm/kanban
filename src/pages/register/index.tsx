import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/components/form/Input";
import SEO from "@/components/SEO";
import api from "@/lib/api";
import clsxm from "@/lib/clsxm";
import { ApiError } from "@/types/api";
import { RegisterForm } from "@/types/register";

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
        <main className="flex flex-col justify-center items-center h-screen w-full">
            <SEO title="Register" description="Register Page" />
            <h1 className="font-bold text-4xl text-center mb-5">Register Page</h1>
            <div className="flex flex-col md:flex-row w-full items-center justify-center">
                <div className="hidden md:block md:w-1/2">
                    <h1 className="text-2xl text-center font-semibold">Welcome to Kanban Board</h1>
                </div>
                <div className="md:w-1/2 flex flex-col items-center">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full p-4 px-16">
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
                                    'bg-[#54C4DB] text-white',
                                    'hover:bg-[#06B0D2] hover:text-white',
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
                        <Link
                            href='/login'
                            className={clsxm(
                                'text-[#54C4DB]',
                                'hover:text-[#06B0D2]',
                            )}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}