import { createSlice } from '@reduxjs/toolkit';



export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    buttons:{
        0:{label:"Mes recettes"},
        1:{label:"Ajouter une recette"},
        2:{label:"Découvrir de nouvelles recettes"},
    },
    selectedButton:0

  },
  reducers: {
    selectButton:(state,action) => {
        state.selectedButton = action.payload
    }
  },
});

export const { 
    selectButton
} = headerSlice.actions;

export const headerSliceReducer = headerSlice.reducer;