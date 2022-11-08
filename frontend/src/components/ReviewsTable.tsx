import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IReview } from "../types";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import {
  Autocomplete,
  Backdrop,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Rating,
  TableFooter,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { editReview, fetchReviews } from "../misc/review";
import TablePaginationActions from "./TablePaginationActions";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { setFilteredReviews } from "../features/review/reviewSlice";

const ReviewsTable = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.review.reviews);
  const filteredReviews = useAppSelector(
    (state) => state.review.filteredReviews
  );
  const loading = useAppSelector((state) => state.review.loading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    onMount();
  }, [reviews.length]);
  const onMount = async () => {
    const res = await dispatch(fetchReviews());
    if (res.type === "review/fetchReviews/rejected") {
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
    const filtered = reviews.filter(
      (review) =>
        review.description.includes(value) ||
        review.movie?.title.includes(value) ||
        review.user?.name.includes(value)
    );
    dispatch(setFilteredReviews(filtered));
  };

  const resetTable = () => {
    dispatch(setFilteredReviews(reviews));
  };

  const approveReview = async (review: IReview, isApprove: boolean) => {
    const updatedReview = { ...review };
    updatedReview.isApproved = isApprove;
    const res = await dispatch(editReview(updatedReview));
    if (res.type === "review/editReview/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
  };

  return (
    <>
      <Typography variant="h6">Reviews Table</Typography>
      <div className="ma-sm">
        <Autocomplete
          freeSolo
          disableClearable
          options={reviews.map((option) => option.description)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Review"
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Movie Title</TableCell>
              <TableCell> User</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReviews && filteredReviews.length > 0 ? (
              (rowsPerPage > 0
                ? filteredReviews.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredReviews
              ).map((review: IReview) => (
                <TableRow
                  key={review.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{review.movie?.title}</TableCell>
                  <TableCell>{review.user?.name}</TableCell>
                  <TableCell>
                    <div className="ellipse">{review.description}</div>
                  </TableCell>
                  <TableCell>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </TableCell>
                  <TableCell>
                    {review.isApproved ? (
                      <Tooltip title="Click to disapprove rating">
                        <Chip
                          icon={<HowToRegIcon />}
                          label="approved"
                          color="success"
                          onClick={() => approveReview(review, false)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Click to approve rating">
                        <Chip
                          icon={<HowToRegIcon />}
                          label="to approved"
                          onClick={() => approveReview(review, true)}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={reviews.length}
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
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ReviewsTable;
