import { ReactNode } from 'react';

export default function LabelText({
  children,
  labelTextClasname,
  required,
}: {
  children: ReactNode;
  labelTextClasname?: string;
  required?: boolean;
}) {
  return (
    <label>
        <p>
            {children} {required && <span className='text-red-500'>*</span>}
        </p>
    </label>
  );
}