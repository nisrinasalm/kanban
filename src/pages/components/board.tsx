import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "./modal";

export default function Board({ title }) {
    const [open, setOpen] = useState(false);
    
    return (
        <>
        <Modal open={open} setOpen={setOpen} />
        <div className="flex flex-col justify-between h-full w-full md:w-1/4 p-2 gap-2">
            <div className="flex">
                <h1 className="font-semibold">
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-2 hover:cursor-pointer text-gray-500 hover:text-gray-300" onClick={() => setOpen(true)}>
                <FaPlus />
                <p>Add New Task</p>
            </div>
        </div>
        </>
    );
}