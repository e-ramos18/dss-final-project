import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteActor, fetchActors, searchActors } from "../../misc/actor";
import { IActor } from "../../types";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import {
  Backdrop,
  Button,
  CircularProgress,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import ActorModal from "../Modals/ActorModal";
import DeleteModal from "../Modals/DeleteModal";
import TablePaginationActions from "./TablePaginationActions";
import { setFilteredActors } from "../../features/actor/actorSlice";
import { throwError } from "../../utils";
import SearchInput from "../SearchInput";

const ActorsTable = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const { actors } = useAppSelector((state) => state.actor);
  const filteredActors = useAppSelector((state) => state.actor.filteredActors);
  const loading = useAppSelector((state) => state.actor.loading);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [actorToEdit, setActorToEdit] = useState<IActor | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onMount();
  }, [actors.length]);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchActors());
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
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

  const handleSearchChange = (key: string) => {
    setSearchValue(key);
  };

  const onSearch = async () => {
    try {
      const res = await dispatch(searchActors(searchValue));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const resetTable = () => {
    dispatch(setFilteredActors(actors));
  };

  const handleOpenDelete = (id?: string) => {
    if (id) {
      setIdToDelete(id);
    }
    setOpenDelete(true);
  };

  const handleOpenEdit = (actor: IActor | null) => {
    if (actor) {
      setActorToEdit(actor);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setActorToEdit(null);
    setOpenEdit(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteActor(id));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setOpenDelete(false);
  };

  const renderTableBody = () => {
    if (filteredActors?.length > 0) {
      if (rowsPerPage > 0) {
        return filteredActors
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((actor: IActor) => (
            <TableRow
              key={actor.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{actor.fname}</TableCell>
              <TableCell align="center">{actor.lname}</TableCell>
              <TableCell align="center">{actor.gender}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleOpenEdit(actor)}>Edit</Button>
                <Button
                  color="error"
                  onClick={() => handleOpenDelete(actor.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ));
      } else {
        return filteredActors.map((actor: IActor) => (
          <TableRow
            key={actor.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{actor.fname}</TableCell>
            <TableCell align="center">{actor.lname}</TableCell>
            <TableCell align="center">{actor.gender}</TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOpenEdit(actor)}>Edit</Button>
              <Button color="error" onClick={() => handleOpenDelete(actor.id)}>
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
      <Typography variant="h6">Actors Table</Typography>
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
            Add Actor
          </Button>
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={actors.length}
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
        <ActorModal open={openAdd} handleClose={() => setOpenAdd(false)} />
        {actorToEdit !== null && (
          <ActorModal
            open={openEdit}
            handleClose={handleCloseEdit}
            actorToEdit={actorToEdit}
            title="Edit Actor"
          />
        )}
        <DeleteModal
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          id={idToDelete}
          handleDelete={handleDelete}
        />
      </TableContainer>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ActorsTable;
