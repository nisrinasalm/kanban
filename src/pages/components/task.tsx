import { token } from "../lib/api";
import toast from "react-hot-toast";

export default function Task({ task }) {
    const deleteTask = () => {
        fetch(`https://oprec-api.labse.in/api/task/${task._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        })
        .then(() => {
            toast.success("Task deleted successfully");
            setTimeout(() => {
            window.location.reload();
            }, 500);
        })
        .catch(() => toast.error("Failed to delete task"));
    };

    return (
        <div>

        </div>
    );
}