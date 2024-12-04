import { combineReducers } from "@reduxjs/toolkit";
import { headerSliceReducer } from "./Slices/HeaderSlice";

const rootReducer = combineReducers({
    header:headerSliceReducer
});

export default rootReducer