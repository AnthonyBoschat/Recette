
import Header from "@Containers/Header/Header";
import "./App.scss"
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AddRecipePage from "@Pages/AddRecipe";
import ExploreRecipePage from "@Pages/ExploreRecipe";
import MyRecipePage from "@Pages/MyRecipe";



export default function App() {

  const selectedPage = useSelector(store => store.header.selectedPage)

  
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
