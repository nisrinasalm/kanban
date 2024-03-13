import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../form/Input";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { CreateTask } from "@/types/task";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "@/types/api";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '30%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

interface AddModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddModal({ open, setOpen }: AddModalProps) {
    const methods = useForm<CreateTask>();
    
    const { handleSubmit } = methods;

    const { mutate: TaskMutation, isPending } = useMutation({
        mutationFn: async (data: CreateTask) => {
            return await api.post("/task", data);
        },
        onSuccess: () => toast.success('Task added succesfully'),
        onError: () => toast.error('Task failed to add'),
    });

    const onSubmit: SubmitHandler<CreateTask> = async (data) => {
        await TaskMutation(data);
        setOpen(false);
    };

    const closeModal = () => setOpen(false);

    return (
        <Modal isOpen={open} style={customStyles}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>            
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Add New Task</h3>
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
                            <Input
                                id='status'
                                label='Status'
                                placeholder='Input status'
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-3 border-2 rounded-md w-full py-2 text-center">Add task</button>
                </form>
            </FormProvider>
        </Modal>
    );
}