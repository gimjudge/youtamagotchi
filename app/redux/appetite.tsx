import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const appetiteSlice = createSlice({
  name: "appetite",
  initialState: {
    appetite: 1
  },
  reducers: {
    setAppetite(state, action: PayloadAction<number>) {
      state.appetite = state.appetite+action.payload
    }
  }
})

export const { setAppetite } = appetiteSlice.actions
export default appetiteSlice.reducer