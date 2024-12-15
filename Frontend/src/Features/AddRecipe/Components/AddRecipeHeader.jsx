export default function AddRecipeHeader({recipeState, recipeDispatch, s}){



    return(
        <>
            <div className={`${s.section}`}>
                <label htmlFor="">Nom</label>
                <input required onChange={(e) => recipeDispatch({type:"SET_RECIPE_NAME", payload:e.currentTarget.value})} type="text" className={`${s.dark}`} value={recipeState.name} />
            </div>
            <input type="submit" className={`${s.dark} ${s.submit}`} value={"Enregistrer la recette"} />
        </>
        
    )
}