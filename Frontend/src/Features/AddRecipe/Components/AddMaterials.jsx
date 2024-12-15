export default function AddMaterials({recipeState, recipeDispatch, s}){

    return(
        <div className={`${s.section} ${s.materials}`}>
            <label htmlFor="">Matériel</label>
            <div className={`${s.container}`}>
                {recipeState.materials.map((material, index) => (
                    <div key={material.id} className={s.material}>
                        <button onClick={() => recipeDispatch({type:"DELETE_MATERIAL", payload:material.id})} className={s.delete}><i className="fa-solid fa-xmark"></i></button>
                        <input required onChange={(e) => recipeDispatch({type:"SET_MATERIAL", payload:{id:material.id, name:e.currentTarget.value}})} key={material.id} type="text" className={`${s.dark}`} value={material.name}/>
                    </div>
                ))}
                <button className={s.add} onClick={() => recipeDispatch({type:"ADD_MATERIAL"})}>
                    <i className={`fa-solid fa-plus`}></i>
                </button>
            </div>
        </div>
    )
}