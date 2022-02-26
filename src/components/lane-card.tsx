import { FC, ReactNode } from "react";
import { Card, CardContent } from "@mui/material";
import { Status } from "../domain/status";

type Props = {
  status: Status;
  children?: ReactNode;
};

const LaneCard: FC<Props> = ({ status, children }: Props) => (
  <Card variant="outlined" sx={{ width: 1 }}>
    <CardContent>
      <h1>{status.toString()}</h1>
      {children}
    </CardContent>
  </Card>
);

export default LaneCard;
