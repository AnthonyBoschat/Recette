import ROUTES from '@Constants/routes';
import { createSlice } from '@reduxjs/toolkit';



export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    buttons:{
        0:{label:"Mes recettes", destination:ROUTES.MY_RECIPE},
        1:{label:"Ajouter une recette", destination:ROUTES.ADD_RECIPE},
        2:{label:"Découvrir de nouvelles recettes", destination:ROUTES.EXPLORE_RECIPE},
    },
  },
  reducers: {

  },
});

export const { 
} = headerSlice.actions;

export const headerSliceReducer = headerSlice.reducer;