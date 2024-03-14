import { Task } from "@/types/task";
import api from "@/lib/api";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import EditModal from "@/components/modal/editModal";
import DeleteModal from "@/components/modal/deleteModal";

export default function Card({ card } : { card: Task }) {
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
        <DeleteModal open={openDelete} setOpen={setOpenDelete} id={card._id} />
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