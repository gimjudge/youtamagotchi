import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    size: 1
  },
  reducers: {
    setSize(state, action: PayloadAction<number>) {
      state.size = state.size+action.payload
    }
  }
})

export const { setSize } = sizeSlice.actions
export default sizeSlice.reducer