import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./Slices";


const store = configureStore({ reducer: { root: rootSlice } })

export default store