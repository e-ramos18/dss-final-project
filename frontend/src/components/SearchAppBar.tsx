import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { getItem, setItem } from "../utils";
import { useNavigate } from "react-router-dom";
import { Button, Container, Paper } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { APIResponse, IUser, Roles } from "../types";
import { getCurrentUser } from "../misc/auth";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";

const SearchAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  React.useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    if (!getItem("token")) return;
    const res: APIResponse = await getCurrentUser();
    if (!res.data && res.error) {
      return setErrorMessage(res.error);
    }
    setCurrentUser(res.data);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    setItem("token", null);
    navigate("/login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getItem("token") ? (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Paper>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <MovieIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              DIGITAL STREAM
            </Typography>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Button onClick={() => navigate("/")}>Movies</Button>
              <Button onClick={() => navigate("/actors")}>Actors</Button>
              {currentUser && currentUser.role !== Roles.User && (
                <Button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              )}
            </Box>
            {currentUser && (
              <Typography
                variant="caption"
                component="div"
                sx={{ display: { xs: "none", sm: "block", margin: 10 } }}
              >
                Welcome {currentUser.name} !
              </Typography>
            )}
            {getItem("token") ? (
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Paper>
  );
};

export default SearchAppBar;
