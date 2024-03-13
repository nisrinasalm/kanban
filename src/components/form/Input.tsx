import { useState } from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import clsxm from "@/lib/clsxm";

import LabelText from "./LabelText";

export type InputProps = {
    id: string;
    label?: string;
    required?: boolean;
    className?: string;
    validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input ({
    id,
    label,
    required,
    validation,
    className,
    type = 'text',
    ...rest
}: InputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);
    const error = get(errors, id);

    return (
        <div className="w-full space-y-2">
           <div className='w-full space-y-2'>
                {label && (
                    <LabelText required={validation?.required ? true : false}>
                    {label}
                    </LabelText>
                )}

                <div className='relative flex w-full gap-0'>
                    <div
                    className={clsxm(
                        'pointer-events-none absolute h-full w-full rounded-md border-[#808080] ring-1 ring-inset ring-[#808080]',
                    )}
                    />

                    <div
                    className={clsxm(
                        'relative w-full rounded-md',
                    )}
                    >

                    <input
                        {...register(id, validation)}
                        type={
                            type === 'password' ? (showPassword ? 'text' : 'password') : type
                        }
                        id={id}
                        name={id}
                        className={clsxm(
                        'h-full w-full rounded-md border border-[#808080] px-3 py-2.5',
                        'text-sm',
                        'hover:ring-1 hover:ring-inset hover:ring-[#000]',
                        'placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540]',
                        className,
                        )}
                        aria-describedby={id}
                        {...rest}
                    />

                    {type === 'password' && (
                        <div
                            className={clsxm(
                            'absolute bottom-0 right-0 h-full',
                            'flex items-center justify-center pr-3',
                            'text-lg text-typo-outline-1 md:text-xl',
                            )}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <HiEye /> : <HiEyeOff />}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}
