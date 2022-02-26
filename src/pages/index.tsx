import type { NextPage } from "next";
import TaskCardNew from "../components/task-card-new";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LaneStack from "../components/lane-stack";

const Home: NextPage = () => (
  <>
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">To-Do List App</Typography>
      </Toolbar>
    </AppBar>
    <main>
      <Container
        maxWidth="lg"
        sx={{
          pt: 5,
        }}
      >
        <Stack spacing={3}>
          <TaskCardNew />
          <Divider sx={{ my: 5 }} />
          <LaneStack />
        </Stack>
      </Container>
    </main>
    <Box component="footer" p={5} textAlign="center">
      Copyright © To-Do List App {new Date().getFullYear()}.
    </Box>
  </>
);

export default Home;
