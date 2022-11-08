import SearchAppBar from "../components/SearchAppBar";
import { Outlet } from "react-router-dom";
import { Box, Container, Paper } from "@mui/material";

const Home = () => {
  return (
    <Paper className="fullHeight">
      <SearchAppBar />
      <Container>
        <div className="main">
          <Outlet />
        </div>
      </Container>
    </Paper>
  );
};

export default Home;
