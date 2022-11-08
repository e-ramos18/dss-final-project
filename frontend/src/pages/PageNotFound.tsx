import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <Paper className="fullHeight">
      <div className="pageNotFound">
        <Typography variant="h3">404 PAGE NOT FOUND !</Typography>
        <Link to="/">Go to home</Link>
      </div>
    </Paper>
  );
};

export default PageNotFound;
