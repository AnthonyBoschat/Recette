import { useDispatch, useSelector } from "react-redux"
import s from "./Header.module.scss"
import { selectButton } from "@Redux/Slices/HeaderSlice"

export default function Header(){


    const {buttons, selectedButton} = useSelector(store => store.header)
    const dispatch = useDispatch()
    

    return(
        <header>
            {Object.keys(buttons).map(key => (
                <button 
                    key={key} 
                    className={selectedButton == key ? s.selected : null}
                    onClick={() => dispatch(selectButton(key))}
                >
                    {buttons[key].label}
                </button>
            ))}
            {/* {buttons.map(button => (
                <button className={button.selected ? s.selected : ""} onClick={button.onClick}>
                    {button.label}
                </button>
            ))} */}
        </header>
    )
}