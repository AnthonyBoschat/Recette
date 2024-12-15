import { useQuery } from "@apollo/client"
import { GET_ALL_RECETTES } from "@Query/GetAllRecettes"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function MyRecipePage(){

    const allRecettes = useSelector(store => store.recette.all)
    
    return(
        <>
        <ul>
            {allRecettes.map(recette => (
                <li key={recette.id}>{recette.name}</li>
            ))}
        </ul>
        <h1>
            MyRecipe
        </h1>
        </>
    )
}