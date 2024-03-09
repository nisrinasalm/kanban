'use client';

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Board from "./components/board";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [boards, setBoards] = useState({
  //   "Backlog": JSON.parse(localStorage.getItem("Backlog")) || [],
  //   "In Progress": JSON.parse(localStorage.getItem("In Progress")) || [],
  //   "Review": JSON.parse(localStorage.getItem("Review")) || [],
  //   "Done": JSON.parse(localStorage.getItem("Done")) || [],
  // });

  // useEffect(() => {
  //   fetch("https://oprec-api.labse.in/api/task", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const Backlog = data.data.tasks.filter((task) => task.status === "Backlog");
  //       const InProgress = data.data.tasks.filter(
  //         (task) => task.status === "In Progress"
  //       );
  //       const Review = data.data.tasks.filter(
  //         (task) => task.status === "Review"
  //       );
  //       const Done = data.data.tasks.filter((task) => task.status === "Done");
  //       setBoards({
  //         "Backlog": Backlog,
  //         "In Progress": InProgress,
  //         "Review": Review,
  //         "Done": Done,
  //       });
  //     });
  // }, []);

  return (
    <main className="relative w-full h-screen bg-white">
      <div className="flex justify-center">
        <h1>
          Project Management Board
        </h1>
      </div>
      <div className="flex justify-center flex-col md:flex-row p-5">
        <Board title="Backlog" />
        <Board title="In Progress" />
        <Board title="Review" />
        <Board title="Done" />
      </div>
    </main>
  );
}
