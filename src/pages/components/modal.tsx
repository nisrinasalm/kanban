
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiError } from 'next/dist/server/api-utils';
import Input from "./form/Input";
import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export type TaskData = {
    title: string;
    description: string;
    dueDate: string;
};

export default function CustomModal({ open, setOpen }) {
    const methods = useForm<TaskData>({
        mode: 'onTouched' 
    });
    
    const { handleSubmit } = methods;
    
    const { mutate: TaskMutation, isPending } = useMutation({
        mutationFn: async (data) => {
          return await api.post("/task", data);
        },
        onSuccess: () => toast.success('Task added succesfully!'),
        onError: () => toast.error('Task failed to add'),
    });

    const onSubmit: SubmitHandler<TaskData> = async (data) => {
        await TaskMutation(data);
        setOpen(false);
    };

    const closeModal = () => setOpen(false);

    return (
        <Modal isOpen={open}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>            
                        <div className="flex justify-between items-center">
                            <h3>Add New Task</h3>
                            <IoMdClose className="hover:cursor-pointer" onClick={closeModal}/>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <Input
                                id='title'
                                label='Title'
                                placeholder='Input title'
                            />
                            <Input
                                id='description'
                                label='Description'
                                placeholder='Input description'
                            />
                            <Input
                                id='dueDate'
                                label='Due Date'
                                placeholder='Input due date'
                                type='date'
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-3 border-2 rounded-md w-full py-2 text-center">Add task</button>
                </form>
            </FormProvider>
        </Modal>
    );
}