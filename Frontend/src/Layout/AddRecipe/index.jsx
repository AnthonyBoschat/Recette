import s from "./style.module.scss"

export default function AddRecipeLayout(){



    return(
        <div className={s.mainContainer}>

            <div className={s.part}>
                <div className={`${s.section}`}>
                    <label htmlFor="">Nom</label>
                    <input type="text" className={`${s.dark}`} value={"Baguette tradition"} />
                </div>
            </div>

            <div className={s.part}>

                {/* Materiel */}
                <div className={`${s.section} ${s.materials}`}>
                    <label htmlFor="">Matériel</label>
                    <div className={`${s.container}`}>
                        <input type="text" className={`${s.dark}`} value={"Pétrin axe oblique"}/>
                        <button><i className={`fa-solid fa-plus ${s.dark}`}></i></button>
                    </div>
                </div>

                {/* Ingredient */}
                <div className={`${s.section} ${s.ingredients}`}>

                    <label htmlFor="">Ingrédients</label>
                    <div className={`${s.container}`}>
                        <div className={`${s.ingredient}`}>
                            <input className={`${s.name} ${s.dark}`} type="text" value={"Farine"} />
                            <input className={`${s.weight} ${s.light}`} type="number" value={1000} />
                        </div>
                        <div className={`${s.ingredient}`}>
                            <input className={`${s.name} ${s.dark}`} type="text" value={"Eau"} />
                            <input className={`${s.weight} ${s.light}`} type="number" value={650} />
                        </div>
                        <div className={`${s.ingredient}`}>
                            <input className={`${s.name} ${s.dark}`} type="text" value={"Sel"} />
                            <input className={`${s.weight} ${s.light}`} type="number" value={18} />
                        </div>
                        <div className={`${s.ingredient}`}>
                            <input className={`${s.name} ${s.dark}`} type="text" value={"Levure"} />
                            <input className={`${s.weight} ${s.light}`} type="number" value={8} />
                        </div>
                        <button><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>

                {/* Etape */}
                <div className={`${s.section} ${s.steps}`}>

                    <label htmlFor="">Matériel</label>
                    <div className={`${s.container}`}>
                        <div className={`${s.step}`}>
                            <input className={`${s.stepNumber} ${s.light}`} type="number" value={1} />
                            <input className={`${s.instruction} ${s.dark}`} type="text" value={"Mettre la farine et l’eau dans la cuve et pétrir pendant 3 minutes jusqu’à obtenir une pâte bâtarde."} />
                            <input className={`${s.duration} ${s.light}`} type="text" value={"3min"} />
                        </div>
                        <div className={`${s.step}`}>
                            <input className={`${s.stepNumber} ${s.light}`} type="number" value={2} />
                            <input className={`${s.instruction} ${s.dark}`} type="text" value={"Laisser reposer la pâte dans la cuve couvert d’un linge pendant 30 minutes."} />
                            <input className={`${s.duration} ${s.light}`} type="text" value={"30min"} />
                        </div>
                        <div className={`${s.step}`}>
                            <input className={`${s.stepNumber} ${s.light}`} type="number" value={3} />
                            <input className={`${s.instruction} ${s.dark}`} type="text" value={"Incorporer la levure dans la pâte."} />
                            <input className={`${s.duration} ${s.light}`} type="text" value={"-"}/>
                        </div>
                        <button><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>

            </div>

        </div>
    )
}