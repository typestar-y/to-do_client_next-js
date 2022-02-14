import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { date, object, string } from "yup";
import { SubmitHandler, UnpackNestedValue, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTasks } from "../hooks/use-tasks";
import TaskButtonCreate from "./task-button-create";
import TaskSnackbarCreate from "./task-snackbar-create";

type Field = {
  name: string;
  due: string;
};

const TaskCardNew: FC = () => {
  const { createTask, isCreatingTask } = useTasks();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const schema = object({
    name: string().required(),
    due: date().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Field>({
    resolver: yupResolver(schema),
  });

  const handleCreatingTask: SubmitHandler<Field> = async (
    value: UnpackNestedValue<Field>
  ) => {
    await createTask({ name: value.name, due: value.due });
    reset();
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(handleCreatingTask)}>
          <CardHeader
            title={
              <TextField
                id="newTaskName"
                label="タスク名"
                {...register("name")}
                fullWidth
                error={"name" in errors}
                helperText={errors.name?.message}
              />
            }
          />
          <CardContent>
            <TextField
              id="newTasKDue"
              label="期日"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("due")}
              fullWidth
              error={"due" in errors}
              helperText={errors.due?.message}
            />
          </CardContent>
          <CardActions>
            <TaskButtonCreate disabled={isCreatingTask} type="submit" />
          </CardActions>
        </form>
      </Card>
      <TaskSnackbarCreate
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
      />
    </>
  );
};

export default TaskCardNew;
