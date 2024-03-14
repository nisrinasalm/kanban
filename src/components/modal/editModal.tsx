import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../form/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { UpdateTask } from "@/types/task";
import clsxm from "@/lib/clsxm";
import { Task } from "@/types/task";
import { TaskData } from "@/types/task";
import { ApiResponse } from "@/types/api";

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

interface EditModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: Task;
}

export default function EditModal({ open, setOpen, task }: EditModalProps) {
    const methods = useForm<UpdateTask>({
        defaultValues: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status
        }
    });
    
    const { handleSubmit } = methods;
    
    const { mutate: EditTaskMutation, isPending } = useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateTask;
        }) => {
          return await api.put(`/task/${id}`, data);
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

    const onSubmit: SubmitHandler<UpdateTask> = async (data) => {
        await EditTaskMutation({ id: task._id, data: data });
        setOpen(false);
    };

    const closeModal = () => setOpen(false);

    return (
        <Modal isOpen={open} style={customStyles}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>            
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Edit Task</h3>
                            <IoMdClose className="hover:cursor-pointer" onClick={closeModal}/>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <Input
                                id='title'
                                label='Title'
                                placeholder='Edit title'
                            />
                            <Input
                                id='description'
                                label='Description'
                                placeholder='Edit description'
                            />
                            <Input
                                id='dueDate'
                                label='Due Date'
                                placeholder='Edit due date'
                                type='date'
                            />
                            <Input
                                id='status'
                                label='Status'
                                placeholder='Edit status'
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
                        Edit task
                    </button>
                    </form>
            </FormProvider>
        </Modal>
    );
}