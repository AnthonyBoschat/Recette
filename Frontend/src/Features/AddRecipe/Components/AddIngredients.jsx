export default function AddIngredients({recipeState, recipeDispatch, s}){



    return(
        <div className={`${s.section} ${s.ingredients}`}>

            <label htmlFor="">Ingrédients</label>
            <div className={`${s.container}`}>
                <div className={`${s.informations} ${s.ingredients}`}>
                    <span>poid (g.)</span>
                </div>
                {recipeState.ingredients.map(ingredient => (
                    <div key={ingredient.id} className={`${s.ingredient}`}>
                        <button onClick={() => recipeDispatch({type:"DELETE_INGREDIENT", payload:ingredient.id})} className={s.delete}><i className="fa-solid fa-xmark"></i></button>
                        <input required onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_NAME", payload:{id:ingredient.id, name:e.currentTarget.value}})} className={`${s.name} ${s.dark}`} type="text" value={ingredient.name} />
                        <input required onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_WEIGHT", payload:{id:ingredient.id, weight:parseInt(e.currentTarget.value)}})} className={`${s.light}`} type="number" value={ingredient.weight ? ingredient.weight : ""} />
                    </div>
                ))}
                <button className={s.add} onClick={() => recipeDispatch({type:"ADD_INGREDIENT"})}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

        </div>
    )
}