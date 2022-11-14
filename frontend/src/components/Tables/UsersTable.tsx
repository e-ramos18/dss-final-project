import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser, Roles } from "../../types";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  TableFooter,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteModal from "../Modals/DeleteModal";
import { deleteUser, editUser, fetchUsers, searchUsers } from "../../misc/user";
import UserModal from "../Modals/UserModal";
import TablePaginationActions from "./TablePaginationActions";
import { setFilteredUsers } from "../../features/user/userSlice";
import SearchInput from "../SearchInput";
import { throwError } from "../../utils";

const UsersTable = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const filteredUsers = useAppSelector((state) => state.user.filteredUsers);
  const loading = useAppSelector((state) => state.user.loading);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchUsers());
      throwError(res.payload);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const resetTable = () => {
    dispatch(setFilteredUsers(users));
  };

  const approveUser = async (user: IUser, isApprove: boolean) => {
    try {
      const updatedUser = { ...user };
      updatedUser.isApproved = isApprove;
      const res = await dispatch(editUser(updatedUser));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleOpenDelete = (id?: string) => {
    if (id) {
      setIdToDelete(id);
    }
    setOpenDelete(true);
  };

  const handleOpenEdit = (user: IUser | null) => {
    if (user) {
      setUserToEdit(user);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setUserToEdit(null);
    setOpenEdit(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteUser(id));
      throwError(res.payload);
      setOpenDelete(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleSearchChange = (key: string) => {
    setSearchValue(key);
  };

  const onSearch = async () => {
    try {
      const res = await dispatch(searchUsers(searchValue));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const renderTableBody = () => {
    if (filteredUsers && filteredUsers.length > 0) {
      if (rowsPerPage > 0) {
        return filteredUsers
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user: IUser) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">
                {user.isApproved ? (
                  <Tooltip title="Click to disapprove User">
                    <Chip
                      disabled={user.role === Roles.RootAdmin}
                      icon={<HowToRegIcon />}
                      label="approved"
                      color="success"
                      onClick={() => approveUser(user, false)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Click to approve User">
                    <Chip
                      icon={<HowToRegIcon />}
                      label="to approved"
                      onClick={() => approveUser(user, true)}
                    />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleOpenEdit(user)}
                  disabled={user.role === Roles.RootAdmin}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleOpenDelete(user.id)}
                  disabled={user.role === Roles.RootAdmin}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ));
      } else {
        return filteredUsers.map((user: IUser) => (
          <TableRow
            key={user.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.name}</TableCell>
            <TableCell align="center">{user.role}</TableCell>
            <TableCell align="center">
              {user.isApproved ? (
                <Tooltip title="Click to disapprove User">
                  <Chip
                    disabled={user.role === Roles.RootAdmin}
                    icon={<HowToRegIcon />}
                    label="approved"
                    color="success"
                    onClick={() => approveUser(user, false)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Click to approve User">
                  <Chip
                    icon={<HowToRegIcon />}
                    label="to approved"
                    onClick={() => approveUser(user, true)}
                  />
                </Tooltip>
              )}
            </TableCell>
            <TableCell align="center">
              <Button
                onClick={() => handleOpenEdit(user)}
                disabled={user.role === Roles.RootAdmin}
              >
                Edit
              </Button>
              <Button
                color="error"
                onClick={() => handleOpenDelete(user.id)}
                disabled={user.role === Roles.RootAdmin}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ));
      }
    } else {
      return (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            No data
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <Typography variant="h6">Users Table</Typography>
      <div className="ma-sm">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={onSearch}
          reset={resetTable}
        />
      </div>
      <TableContainer component={Paper}>
        <div className="ma-sm">
          <Button variant="contained" onClick={() => setOpenAdd(true)}>
            Add User
          </Button>
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"> Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <UserModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      {userToEdit !== null && (
        <UserModal
          open={openEdit}
          handleClose={handleCloseEdit}
          userToEdit={userToEdit}
          title="Edit User"
        />
      )}
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={idToDelete}
        handleDelete={handleDelete}
      />
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default UsersTable;
