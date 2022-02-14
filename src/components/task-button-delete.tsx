import { IconButton } from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  disabled?: boolean;
  onClick: () => Promise<void>;
};

const TaskButtonDelete: FC<Props> = ({ onClick }: Props) => {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
};

export default TaskButtonDelete;
