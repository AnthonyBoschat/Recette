import { createSlice } from '@reduxjs/toolkit';



export const recetteSlice = createSlice({
  name: 'recette',
  initialState: {
    all:[]
  },
  reducers: {
    setRecettes:(state, action) => {
        state.all = action.payload
    },
    addRecette:(state,action) => {
        state.all.push(action.payload)
    }
  },
});

export const { 
    setRecettes,
    addRecette
} = recetteSlice.actions;

export const recetteSliceReducer = recetteSlice.reducer;