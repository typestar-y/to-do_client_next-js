import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
};

const TaskButtonUpdate: FC<Props> = ({ disabled = false, type }: Props) => {
  return (
    <Button
      variant="outlined"
      disableElevation
      fullWidth
      disabled={disabled}
      type={type}
    >
      更新
    </Button>
  );
};

export default TaskButtonUpdate;
