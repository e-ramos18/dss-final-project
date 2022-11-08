import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteActor, fetchActors } from "../misc/actor";
import { IActor } from "../types";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TableFooter,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddActorModal from "./AddActorModal";
import DeleteModal from "./DeleteModal";
import EditActorModal from "./EditActorModal";
import TablePaginationActions from "./TablePaginationActions";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { setFilteredActors } from "../features/actor/actorSlice";

const ActorsTable = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actor.actors);
  const filteredActors = useAppSelector((state) => state.actor.filteredActors);
  const loading = useAppSelector((state) => state.actor.loading);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [actorToEdit, setActorToEdit] = useState<IActor | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    onMount();
  }, [actors.length]);
  const onMount = async () => {
    const res = await dispatch(fetchActors());
    if (res.type === "actor/fetchActors/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  const handleSearchChange = (_event: object, value: string) => {
    const filtered = actors.filter(
      (actor) =>
        actor.fname.includes(value) ||
        actor.lname.includes(value) ||
        actor.gender.includes(value)
    );
    dispatch(setFilteredActors(filtered));
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
    const res = await dispatch(deleteActor(id));
    if (res.type === "actor/deleteActor/rejected") {
      //@ts-ignore
      return setErrorMessage(res.error.message);
    }
    setOpenDelete(false);
  };

  const renderTableBody = () => {
    if (filteredActors && filteredActors.length > 0) {
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
        <Autocomplete
          freeSolo
          disableClearable
          options={actors.map((option) => option.fname)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Actor"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Reset">
                      <IconButton onClick={() => resetTable()}>
                        <RestartAltIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          )}
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
        <AddActorModal open={openAdd} handleClose={() => setOpenAdd(false)} />
        {actorToEdit !== null && (
          <EditActorModal
            open={openEdit}
            handleClose={handleCloseEdit}
            actor={actorToEdit}
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
