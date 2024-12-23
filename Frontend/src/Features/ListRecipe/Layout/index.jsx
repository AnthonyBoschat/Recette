import { useSelector } from "react-redux"
import s from "./style.module.scss"

export default function ListRecipeLayout(){

    const allRecettes = useSelector(store => store.recette.all)

    return(
        <section className={s.layout}>
            <div className={s.header}>
                <select className={s.category} name="" id="">
                    <option value="">Petit déjeuner</option>
                    <option value="">Déjeuner</option>
                    <option value="">Dessert</option>
                    <option value="">Sucrée</option>
                </select>
            </div>
            <div className={s.list}>
                {allRecettes.map(recette => (
                    <button>{recette.name}</button>
                ))}
            </div>
        </section>
    )
}