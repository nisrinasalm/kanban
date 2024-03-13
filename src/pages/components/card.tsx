import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@/types/task";
import api from "@/lib/api";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import clsxm from "@/lib/clsxm";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import EditModal from "@/components/modal/editModal";
import DeleteModal from "@/components/modal/deleteModal";

export default function Card({ cardData } : { cardData: Task }) {
    // const [edit, setEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleEditClick = () => {
        setOpenEdit(true);
    }

    const DeleteTask = (id: string) => {
        return api.delete(`/task/${id}`);
    };

    const handleDeleteClick = () => {
        DeleteTask(cardData._id)
    };

    const dueDate = new Date(cardData.dueDate);
    const formattedDueDate = `${dueDate.getDate()}-${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;

    return (
        <>
        <EditModal open={openEdit} setOpen={setOpenEdit} task={cardData} />
        <DeleteModal open={openDelete} setOpen={setOpenDelete} taskId={cardData._id} />
        <div className="rounded-md py-2 px-4 space-y-1 shadow-lg">
            <div className="flex justify-between items-center">
                <p className="text-base font-semibold">{cardData.title}</p>
                <div className="flex gap-2">
                    <BiSolidEdit className="hover:text-gray-500 hover:cursor-pointer" onClick={handleEditClick} />
                    <MdDelete className="hover:text-gray-500 hover:cursor-pointer" onClick={handleDeleteClick} />
                </div>
            </div>
            <p>{cardData.description}</p>
            <p>{formattedDueDate}</p>
        </div>
        </>
    );
}