import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditModal from "@/components/modal/editModal";
import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { TaskData, Task } from "@/types/task";

export default function Card({ card } : { card: Task }) {
    const [openEdit, setOpenEdit] = useState(false);

    const handleEditClick = () => {
        setOpenEdit(true);
    }

    const { data: taskData, refetch } = useQuery({
        queryKey: ['/task'],
        queryFn: () => {
            return api.get<ApiResponse<TaskData>>("/task");
        }
    })

    const DeleteTask = async (id: string) => {{
            await api.delete(`/task/${id}`);
            refetch();
    }};

    const handleDeleteClick = () => {
        DeleteTask(card._id)
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
        {card && (
        <>
        <EditModal open={openEdit} setOpen={setOpenEdit} task={card} />
        <div className="rounded-md py-2 px-4 space-y-1 shadow-lg">
            <div className="flex justify-between items-center">
                <p className="text-base font-semibold">{card.title}</p>
                <div className="flex gap-2">
                    <BiSolidEdit className="hover:text-gray-500 hover:cursor-pointer" onClick={handleEditClick} />
                    <MdDelete className="hover:text-gray-500 hover:cursor-pointer" onClick={handleDeleteClick} />
                </div>
            </div>
            <p className="text-gray-500">{card.description}</p>
            <p className="text-gray-500">{formatDate(card.dueDate)}</p>
        </div>
        </>
        )}
        </>
    );
}