
import Header from "@Shared/Layout/Header/Header";
import "./App.scss"
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ExploreRecipePage from "@Features/ExploreRecipe/Page";
import MyRecipePage from "@Features/ListRecipe/Page";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECETTES } from "@Query/GetAllRecettes";
import { useEffect } from "react";
import { setRecettes } from "@Redux/Slices/RecetteSlice";
import AddRecipePage from "./Features/AddRecipe/Page";



export default function App() {

  const dispatch = useDispatch()
  
  // Récupère la liste des recettes
  const {loading:allRecettesLoading, error:allRecettesError, data:allRecettesData} = useQuery(GET_ALL_RECETTES)
  useEffect(() => {
    if(!allRecettesLoading && allRecettesData){
      dispatch(setRecettes(allRecettesData.allRecettes))
    }
  }, [allRecettesLoading])


  
  return (
    <main>
      <Header/>
      
      <Routes>
        <Route path="/" element={<MyRecipePage/>}/>
        <Route path="/addRecipe" element={<AddRecipePage/>}/>
        <Route path="/exploreRecipe" element={<ExploreRecipePage/>}/>
      </Routes>
    </main>
  )
}
