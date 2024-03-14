import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import clsxm from "@/lib/clsxm";
import { CreateTask, TaskData } from "@/types/task";
import { ApiResponse } from "@/types/api";

import Input from "../form/Input";

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
    const methods = useForm<CreateTask>({
        mode: 'onTouched' 
    });

    const { handleSubmit } = methods;

    const { mutate: TaskMutation, isPending } = useMutation({
        mutationFn: async (data: CreateTask) => {
            return await api.post(`/task`, data);
        },
        onSuccess: () => {
            refetch();
        }
    });

    const { data: taskData, refetch } = useQuery({
        queryKey: ['/task'],
        queryFn: () => {
            return api.get<ApiResponse<TaskData>>("/task");
        }
    })

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
                    <button 
                        type="submit"
                        className={clsxm(
                            'bg-[#54C4DB] text-white',
                            'hover:bg-[#06B0D2] hover:text-white',
                            'w-full',
                            'rounded-md py-2 text-center font-medium',
                            'mt-4'
                        )}
                    >
                        Add task
                    </button>
                </form>
            </FormProvider>
        </Modal>
    );
}