import { Backdrop, CircularProgress, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { getCurrentUser } from "../misc/auth";
import { APIResponse, Roles } from "../types";
import { getItem } from "../utils";
const ProtectedPage = () => {
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const [loading, setLoading] = useState(false);

  const token = getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => {
    setLoading(true);
    const res: APIResponse = await getCurrentUser();
    if (!res.data && res.error) {
      setErrorMessage(res.error);
    } else if (
      res.data &&
      (res.data.role === Roles.Admin || res.data.role === Roles.RootAdmin)
    ) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Paper>
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedPage;
