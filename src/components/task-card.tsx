import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useEffect,
  useState,
} from "react";
import { date, object, string } from "yup";
import { SubmitHandler, UnpackNestedValue, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskDTO } from "../hooks/use-tasks";
import TaskButtonDelete from "./task-button-delete";
import TaskButtonUpdate from "./task-button-update";
import TaskSnackbarUpdate from "./task-snackbar-update";

type Props = {
  id: string;
  name: string;
  due: string;
  status: string;
  updateTask: (target: TaskDTO) => Promise<void>;
  isUpdatingTask: boolean;
  deleteTask: (targetId: string) => Promise<void>;
  isDeletingTask: boolean;
};

type TaskFieldDTO = {
  name: string;
  due: string;
  status: string;
};

const statuses = ["Todo", "Doing", "Done"];

const TaskCard: FC<Props> = ({
  id,
  name,
  due,
  status: _status,
  updateTask,
  isUpdatingTask,
  deleteTask,
  isDeletingTask,
}: Props) => {
  const [status, setStatus] = useState(_status);
  const [isSnackbarUpdateOpen, setIsSnackbarUpdateOpen] = useState(false);

  useEffect(() => {
    setStatus(_status);
  }, [_status]);

  const schema = object({
    name: string().required(),
    due: date().required(),
    status: string()
      .matches(/^(Todo)|(Doing)|(Done)$/)
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFieldDTO>({
    resolver: yupResolver(schema),
  });

  const handleUpdatingTask: SubmitHandler<TaskFieldDTO> = async (
    value: UnpackNestedValue<TaskFieldDTO>
  ) => {
    await updateTask({
      id: id,
      name: value.name,
      due: value.due,
      status: value.status,
    });
    setIsSnackbarUpdateOpen(true);
  };

  const handleDeletingTask = async () => {
    await deleteTask(id);
  };

  const handleStatusChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(handleUpdatingTask)}>
          <CardHeader
            title={
              <TextField
                id="name"
                label="タスク名"
                {...register("name")}
                defaultValue={name}
                fullWidth
                error={"name" in errors}
                helperText={errors.name?.message}
              />
            }
          />
          <CardContent>
            <Stack spacing={3}>
              <TextField
                id={"due"}
                {...register("due")}
                label="期日"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={due}
                fullWidth
                error={"due" in errors}
                helperText={errors.due?.message}
              />
              <TextField
                id="status"
                select
                {...register("status")}
                label="ステータス"
                defaultValue={_status}
                value={status}
                onChange={handleStatusChange}
                fullWidth
                error={"status" in errors}
                helperText={errors.status?.message}
              >
                {statuses.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </CardContent>
          <CardActions>
            <TaskButtonUpdate
              disabled={isUpdatingTask || isDeletingTask}
              type="submit"
            />
            <TaskButtonDelete
              onClick={handleDeletingTask}
              disabled={isUpdatingTask || isDeletingTask}
            />
          </CardActions>
        </form>
      </Card>
      <TaskSnackbarUpdate
        isOpen={isSnackbarUpdateOpen}
        setIsOpen={setIsSnackbarUpdateOpen}
      />
    </>
  );
};

export default TaskCard;
