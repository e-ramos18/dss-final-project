import reducer, { InitialState } from "../../features/review/reviewSlice";
import { addReview, editReview, fetchReviews } from "../../misc/review";
import { reviewMock, reviewsMock } from "../../mocks/mockValues";

describe("Review Slice ExtraReducers", () => {
  const initialState: InitialState = {
    reviews: [],
    filteredReviews: [],
    loading: false,
  };

  // Fetch reviews
  describe("fetchReviews", () => {
    it("pending", () => {
      const action = { type: fetchReviews.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: fetchReviews.fulfilled.type,
        payload: reviewsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: reviewsMock.data,
        filteredReviews: reviewsMock.data,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchReviews.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: false,
      });
    });
  });

  // add review
  describe("addReview", () => {
    it("pending", () => {
      const action = { type: addReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: addReview.fulfilled.type,
        payload: reviewMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [reviewMock.data],
        filteredReviews: [reviewMock.data],
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: addReview.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: false,
      });
    });
  });

  // add review
  describe("editReview", () => {
    it("pending", () => {
      const action = { type: editReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: addReview.fulfilled.type,
        payload: reviewMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [reviewMock.data],
        filteredReviews: [reviewMock.data],
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: editReview.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        reviews: [],
        filteredReviews: [],
        loading: false,
      });
    });
  });
});
