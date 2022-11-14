import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteMovie, fetchMovies, searchMovies } from "../../misc/movie";
import { IMovie } from "../../types";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import MovieModal from "../Modals/MovieModal";
import DeleteModal from "../Modals/DeleteModal";
import * as React from "react";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import AddActorModal from "../Modals/ActorModal";
import { setFilteredMovies } from "../../features/movie/movieSlice";
import SearchInput from "../SearchInput";
import { throwError } from "../../utils";

const MoviesTable = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const { movies, filteredMovies, loading } = useAppSelector(
    (state) => state.movie
  );
  const [openAdd, setOpenAdd] = useState(false);
  const [openAddActor, setOpenAddActor] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [movieToEdit, setMovieToEdit] = useState<IMovie | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchMovies());
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

  const resetTable = () => {
    dispatch(setFilteredMovies(movies));
  };

  const handleOpenDelete = (id?: string) => {
    if (id) {
      setIdToDelete(id);
    }
    setOpenDelete(true);
  };

  const handleOpenEdit = (movie: IMovie | null) => {
    if (movie) {
      setMovieToEdit(movie);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setMovieToEdit(null);
    setOpenEdit(false);
  };

  const compareYear = (year: string): boolean => {
    const d = new Date();
    return parseInt(year) >= d.getFullYear();
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteMovie(id));
      throwError(res.payload);
      setOpenDelete(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const renderTableBody = () => {
    if (filteredMovies?.length > 0) {
      if (rowsPerPage > 0) {
        return filteredMovies
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((movie: IMovie, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{movie.title}</TableCell>
              <TableCell align="center">{movie.cost}</TableCell>
              <TableCell align="center">{movie.year}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleOpenEdit(movie)}>Edit</Button>
                <Button
                  disabled={compareYear(movie.year)}
                  color="error"
                  onClick={() => handleOpenDelete(movie.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ));
      } else {
        return filteredMovies.map((movie: IMovie, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{movie.title}</TableCell>
            <TableCell align="center">{movie.cost}</TableCell>
            <TableCell align="center">{movie.year}</TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOpenEdit(movie)}>Edit</Button>
              <Button
                disabled={compareYear(movie.year)}
                color="error"
                onClick={() => handleOpenDelete(movie.id)}
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

  const handleSearchChange = (key: string) => {
    setSearchValue(key);
  };

  const onSearch = async () => {
    try {
      const res = await dispatch(searchMovies(searchValue));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Typography variant="h6">Movies Table</Typography>
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
            Add Movie
          </Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={movies.length}
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
      <MovieModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenAddActor={setOpenAddActor}
      />
      <AddActorModal
        open={openAddActor}
        handleClose={() => setOpenAddActor(false)}
      />
      {movieToEdit !== null && (
        <MovieModal
          open={openEdit}
          handleClose={handleCloseEdit}
          movieToEdit={movieToEdit}
          setOpenAddActor={setOpenAddActor}
          title="Edit Movie"
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

export default MoviesTable;
