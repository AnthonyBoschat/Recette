import { combineReducers } from "@reduxjs/toolkit";
import { headerSliceReducer } from "./Slices/HeaderSlice";
import { recetteSliceReducer } from "./Slices/RecetteSlice";

const rootReducer = combineReducers({
    header:headerSliceReducer,
    recette:recetteSliceReducer
});

export default rootReducer