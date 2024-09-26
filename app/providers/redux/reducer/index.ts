import { createSlice } from "@reduxjs/toolkit";

export const pagination = createSlice({
  name: "quantity",
  initialState: {
    pageNumber: 1,
  },
  reducers: {
    storePageNumber: (
      state: { pageNumber: number },
      action: { payload: number }
    ) => {
      if (action.payload > 0) {
        state.pageNumber = action.payload;
        return;
      }
    },
  },
});

export const { storePageNumber } = pagination.actions;

export default pagination.reducer;
