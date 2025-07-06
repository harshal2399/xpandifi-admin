import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/authSlice"; // Adjust the import path as necessary
import campaignReducer from "./slices/campaignSlice"; // Adjust the import path as necessary
// ...other imports...

export default configureStore({
  reducer: {
    auth: loginReducer,
    campaign: campaignReducer, // Assuming you have a campaignReducer
    // ...other reducers...
  },
});