import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
};

const TaskButtonCreate: FC<Props> = ({ disabled = false, type }: Props) => {
  return (
    <Button
      variant="contained"
      disableElevation
      fullWidth
      disabled={disabled}
      type={type}
    >
      タスクを作成
    </Button>
  );
};

export default TaskButtonCreate;
