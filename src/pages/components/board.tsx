import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import AddModal from "../../components/modal/addModal";
import Card from "./card";
import api from "@/lib/api";
import { Task } from "@/types/task";

export default function Board({ title }: {title: string}) {
    const [open, setOpen] = useState(false);
    
    const { data: TaskData, isLoading } = useQuery({
        queryKey: ["/task"],
        queryFn: async (data) => {
            return api.get("/task", data);
        },
    });

    const FilterStatus = TaskData?.data?.data?.tasks.filter((task: Task) => task.status === title && !task.deletedAt) || [];

    return (
        <>
        <AddModal open={open} setOpen={setOpen} />
        <div className="flex flex-col justify-between h-full w-full md:w-1/4 p-2 gap-2">
            <div className="flex">
                <h1 className="font-semibold">
                    {title}
                </h1>
            </div>
            <div className="space-y-3">
                {FilterStatus.map((cardData: Task) => (
                    <Card cardData={cardData} key={cardData._id} />
                ))}
            </div>
            <div className="mt-2 flex items-center gap-2 hover:cursor-pointer text-gray-500 hover:text-gray-300" onClick={() => setOpen(true)}>
                <FaPlus />
                <p>Add New Task</p>
            </div>
        </div>
        </>
    );
}