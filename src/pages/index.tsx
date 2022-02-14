import type { NextPage } from "next";
import { useTasks } from "../hooks/use-tasks";
import { Task } from "../domain/task";
import dayjs from "dayjs";
import TaskCardNew from "../components/task-card-new";
import TaskCard from "../components/task-card";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const Home: NextPage = () => {
  const {
    tasks,
    isTasksLoading,
    isTasksError,
    updateTask,
    isUpdatingTask,
    deleteTask,
    isDeletingTask,
  } = useTasks();

  if (isTasksLoading) {
    return <h1>loading...</h1>;
  }
  if (isTasksError) {
    return <h1>error</h1>;
  }
  if (tasks === undefined) {
    return <p>no tasks</p>;
  }
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">To-Do List App</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container
          maxWidth="xs"
          sx={{
            pt: 5,
          }}
        >
          <TaskCardNew />
          {tasks.length > 0 ? <Divider sx={{ my: 5 }} /> : null}
          <Stack spacing={1}>
            {tasks
              .sort(
                (a: Task, b: Task) => dayjs(a.due).unix() - dayjs(b.due).unix()
              )
              .map((task: Task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  due={task.getDueString()}
                  status={task.status.toString()}
                  updateTask={updateTask}
                  isUpdatingTask={isUpdatingTask}
                  deleteTask={deleteTask}
                  isDeletingTask={isDeletingTask}
                />
              ))}
          </Stack>
        </Container>
      </main>
      <Box component="footer" p={5} textAlign="center">
        Copyright © To-Do List App {new Date().getFullYear()}.
      </Box>
    </>
  );
};

export default Home;
