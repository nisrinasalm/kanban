
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../form/Input";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { UpdateTask } from "@/types/task";
import clsxm from "@/lib/clsxm";
import { Task } from "@/types/task";

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
    const methods = useForm<UpdateTask>();
    
    const { handleSubmit } = methods;
    
    const { mutate: EditTaskMutation, isPending } = useMutation({
        mutationFn: async ({
            taskId,
            taskData,
        }: {
            taskId: string;
            taskData: UpdateTask;
        }) => {
          return await api.put("/task/${taskId}", taskData);
        },
        onSuccess: () => toast.success('Task edited succesfully'),
        onError: () => toast.error('Task failed to edit'),
    });

    const onSubmit: SubmitHandler<UpdateTask> = async (data) => {
        await EditTaskMutation({ taskId: task._id, taskData: data });
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
                    <button type="submit" className="mt-3 border-2 rounded-md w-full py-2 text-center">Edit task</button>
                </form>
            </FormProvider>
        </Modal>
    );
}