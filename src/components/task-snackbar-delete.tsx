import { Snackbar } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import * as React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TaskSnackbarDelete: FC<Props> = ({ isOpen, setIsOpen }: Props) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={1500}
      message="削除しています..."
    />
  );
};

export default TaskSnackbarDelete;
