import AppBar from "../components/AppBar";
import { Outlet } from "react-router-dom";
import { Container, Paper } from "@mui/material";

const Home = () => {
  return (
    <Paper className="fullHeight">
      <AppBar />
      <Container>
        <div className="main">
          <Outlet />
        </div>
      </Container>
    </Paper>
  );
};

export default Home;
