import { useDispatch, useSelector } from "react-redux"
import s from "./Header.module.scss"
import { selectButton } from "@Redux/Slices/HeaderSlice"
import { useLocation, useNavigate } from "react-router-dom"

export default function Header(){


    const {buttons} = useSelector(store => store.header)
    const navigate = useNavigate()
    const location = useLocation()
    

    return(
        <header>
            {Object.keys(buttons).map(key => (
                <button 
                    key={key} 
                    className={location.pathname === buttons[key]?.destination ? s.selected : null}
                    onClick={() => navigate(buttons[key]?.destination)}
                >
                    {buttons[key].label}
                </button>
            ))}
        </header>
    )
}