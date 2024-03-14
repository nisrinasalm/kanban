import Board from "../components/board";
import { IoIosLogOut } from "react-icons/io";
import clsxm from "@/lib/clsxm";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";

export default function Homepage() {
    const { logout } = useAuthStore();
    const router = useRouter();
    
    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <main className="px-2 py-5 relative w-full">
            <SEO title="Home" description="Home Page"/>
            <div className="flex justify-between px-5">
                <h1 className="font-bold text-2xl">
                Kanban Board
                </h1>
                <div className="flex justify-end items-center">
                    <IoIosLogOut 
                        className={clsxm(
                            'text-[#FC3E3E]',
                            'hover:cursor-pointer hover:text-[#972525]',
                            'text-2xl',
                        )}
                        onClick={handleLogout}
                    />
                </div>
            </div>
            <div className="mt-2 flex justify-center flex-col md:flex-row p-5 gap-5">
                <Board title="Backlog" />
                <Board title="In Progress" />
                <Board title="Review" />
                <Board title="Done" />
            </div>
        </main>
    );
}