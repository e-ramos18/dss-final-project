import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addReview, editReview, fetchReviews } from "../../misc/review";
import { CustomApiResponse, IReview } from "../../types";

export type InitialState = {
  reviews: IReview[];
  filteredReviews: IReview[];
  loading: boolean;
};
const initialState: InitialState = {
  reviews: [],
  filteredReviews: [],
  loading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setFilteredReviews(state, action) {
      state.filteredReviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch reviews
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchReviews.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.reviews = action.payload.data as IReview[];
        state.filteredReviews = action.payload.data as IReview[];
      }
    );
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      state.filteredReviews = [];
    });

    // Add a review
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addReview.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.reviews = state.reviews.concat(action.payload.data as IReview);
        state.filteredReviews = state.filteredReviews.concat(
          action.payload.data as IReview
        );
      }
    );
    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
    });

    // Edit a review
    builder.addCase(editReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editReview.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        const newReviews: IReview[] = [...state.reviews];
        const data = action.payload.data as IReview;
        //finding index of the review
        const index: number = newReviews.findIndex((m) => m.id === data.id);
        newReviews[index] = data;
        state.reviews = newReviews;
        state.filteredReviews = newReviews;
      }
    );
    builder.addCase(editReview.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { setFilteredReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
