import { createSlice } from "@reduxjs/toolkit";

// The function below is called a thunk and allows us to perform async logic. It

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraImage: null,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage:(state) =>{
        state.cameraImage = null
    }
  },
});

export const { setCameraImage,resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
