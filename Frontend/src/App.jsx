
import Header from "@Containers/Header/Header";
import "./App.scss"
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ExploreRecipePage from "@Pages/ExploreRecipe";
import MyRecipePage from "@Pages/MyRecipe";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECETTES } from "@Query/GetAllRecettes";
import { useEffect } from "react";
import { setRecettes } from "@Redux/Slices/RecetteSlice";
import AddRecipePage from "./Features/AddRecipe/Page";



export default function App() {

  const dispatch = useDispatch()
  
  const {loading, error, data} = useQuery(GET_ALL_RECETTES)
  useEffect(() => {
    if(!loading && data){
      dispatch(setRecettes(data.allRecettes))
    }
  }, [loading])


  
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
