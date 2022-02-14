import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Task } from "../domain/task";
import { useState } from "react";

export type TaskDTO = {
  id: string;
  name: string;
  due: string;
  status: string;
};

type CreateTaskFieldDTO = {
  name: string;
  due: string;
};

export const useTasks = () => {
  const API_TASKS_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`;

  const fetcher = (url: string): Promise<TaskDTO[]> =>
    axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(API_TASKS_BASE_URL, fetcher);
  const { mutate } = useSWRConfig();

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  const createTask = async (target: CreateTaskFieldDTO): Promise<void> => {
    setIsCreatingTask(true);
    await axios.post(API_TASKS_BASE_URL, target);
    setIsCreatingTask(false);
    await mutate(API_TASKS_BASE_URL);
  };

  const updateTask = async (target: TaskDTO): Promise<void> => {
    setIsUpdatingTask(true);
    await axios.put(`${API_TASKS_BASE_URL}/${target.id}`, target);
    setIsUpdatingTask(false);
    await mutate(API_TASKS_BASE_URL);
  };

  const deleteTask = async (targetId: string): Promise<void> => {
    setIsDeletingTask(true);
    await axios.delete(`${API_TASKS_BASE_URL}/${targetId}`);
    setIsDeletingTask(false);
    await mutate(API_TASKS_BASE_URL);
  };

  return {
    tasks: data?.map((dto: TaskDTO) =>
      Task.of(dto.id, dto.name, dto.due, dto.status)
    ),
    isTasksLoading: !error && !data,
    isTasksError: error,
    createTask: createTask,
    isCreatingTask: isCreatingTask,
    updateTask: updateTask,
    isUpdatingTask: isUpdatingTask,
    deleteTask: deleteTask,
    isDeletingTask: isDeletingTask,
  };
};
