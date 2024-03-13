export type CreateTask = {
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

export type UpdateTask = {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: string;
}

export type Task = {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    deletedAt?: string;
};
  
export type TaskData = {
    tasks: Task[];
};