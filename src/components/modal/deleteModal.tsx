import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../form/Input";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { CreateTask } from "@/types/task";
import clsxm from "@/lib/clsxm";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '30%',
      transform: 'translate(-50%, -50%)',
    },
};

interface DeleteModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string;
}

export default function DeleteModal({ open, setOpen, taskId }: DeleteModalProps) {    
    const { mutate: DeleteTaskMutation, isPending } = useMutation({
        mutationFn: async (id: string) => {
          return await api.delete("/task/${id");
        },
        onSuccess: () => toast.success('Task deleted succesfully'),
        onError: () => toast.error('Task failed to delete'),
    });

    const handleDelete = (taskid: string) => {
        DeleteTaskMutation(taskid);
        setOpen(false);
    };

    const closeModal = () => setOpen(false);

    return (
        <Modal isOpen={open} style={customStyles}>
            <div>            
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Delete Task</h3>
                    <IoMdClose className="hover:cursor-pointer" onClick={closeModal}/>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                    <p>Are you sure want to delete this task?</p>    
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    className="mt-3 ring-1 ring-gray-500 hover:ring-black hover:ring-2 rounded-md w-full py-1 text-center"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button 
                    className="mt-3 ring-1 ring-gray-500 hover:ring-red-500 hover:ring-2 rounded-md w-full py-1 text-center"    
                    onClick={() => handleDelete(taskId)}
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
}