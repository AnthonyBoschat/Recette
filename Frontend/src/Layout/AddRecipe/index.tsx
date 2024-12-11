import { BaseSyntheticEvent, MouseEventHandler, useReducer } from "react"
import s from "./style.module.scss"
import IDService from "@Services/IDService"

interface ingredientType{
    id:number
    name:string
    weight:number|null
}

interface instructionType{
    id:number
    step:number
    sentence:string
    hour:number
    minute:number
    seconde:number
}

interface materialType{
    id:number
    name:string
}

interface recipeType{
    recipeName:string
    materials:materialType[]
    ingredients:ingredientType[]
    instructions:instructionType[]
}

type recipeAction = 
{type:"SET_RECIPE_NAME", payload:string}
|{type:"ADD_MATERIAL"}
|{type:"SET_MATERIAL", payload:{id:number, name:string}}
|{type:"ADD_INGREDIENT"}
|{type:"SET_INGREDIENT_NAME", payload:{id:number, name:string}}
|{type:"SET_INGREDIENT_WEIGHT", payload:{id:number, weight:number}}
|{type:"ADD_INSTRUCTION"}
|{type:"SET_INSTRUCTION_SENTENCE", payload:{id:number, sentence:string}}
|{type:"SET_INSTRUCTION_HOUR", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_MINUTE", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_SECONDE", payload:{id:number, value:string}}

export default function AddRecipeLayout(){

    const removeNullNumber = (e:BaseSyntheticEvent) => {
        console.log(e.currentTarget.value)
        if(e.currentTarget.value === "-"){
            e.currentTarget.value = ""
        }
    }
    const addNullNumber = (e:BaseSyntheticEvent) => {
        console.log(e.currentTarget.value)
        if(e.currentTarget.value === "" || e.currentTarget.value === "0"){
            e.currentTarget.value = "-"
        }
    }

    const nullNumber = (value:number) => {
        if(value === 0){
            return "-"
        }
    }

    const checkNumber = (durationValue:string) => {
        return /^\d+$/.test(durationValue)
    }

    const getNextStep = (instructions : instructionType[]) => {
        return Math.max(...instructions.map(instruction => instruction.step)) + 1
    }

    const recipeInitialState:recipeType = {
        recipeName:"Baguette de tradition française",
        materials:[{id:0, name:"Pétrin axe oblique"}],
        ingredients:[
            {id:0, name:"Farine", weight:1000},
            {id:1, name:"Eau", weight:650},
            {id:2, name:"Sel", weight:18},
            {id:3, name:"Levure", weight:8},
        ],
        instructions:[
            {id:0, step:1, sentence:"Mettre la farine et l’eau dans la cuve et pétrir pendant 3 minutes jusqu’à obtenir une pâte bâtarde.", hour:0, minute:0, seconde:0},
            {id:1, step:2, sentence:"Laisser reposer la pâte dans la cuve couvert d’un linge pendant 30 minutes.", hour:0, minute:0, seconde:0},
            {id:2, step:3, sentence:"Incorporer la levure dans la pâte.", hour:0, minute:0, seconde:0},
        ]
    }

    const recipeStateReducer = (state:recipeType, action:recipeAction):recipeType => {
        switch(action.type){
            case "SET_RECIPE_NAME":
                return {...state, recipeName:action.payload}
            case "ADD_MATERIAL":
                return {...state, materials:[...state.materials, {id:IDService.getNextID(state.materials), name:""}]}
            case "SET_MATERIAL":
                return {...state, materials:state.materials.map(material => material.id === action.payload.id ? {...material, name:action.payload.name} : material)}
            case "ADD_INGREDIENT":
                return {...state, ingredients:[...state.ingredients, {id:IDService.getNextID(state.ingredients), name:"", weight:null}]}
            case "SET_INGREDIENT_NAME":
                return {...state, ingredients:state.ingredients.map(ingredient => ingredient.id === action.payload.id ? {...ingredient, name:action.payload.name} : ingredient)}
            case "SET_INGREDIENT_WEIGHT":
                return {...state, ingredients:state.ingredients.map(ingredient => ingredient.id === action.payload.id ? {...ingredient, weight:action.payload.weight} : ingredient)}
            case "ADD_INSTRUCTION":
                return {...state, instructions:[...state.instructions, {id:IDService.getNextID(state.instructions), step:getNextStep(state.instructions), sentence:"", hour:0, minute:0, seconde:0}]}
            case "SET_INSTRUCTION_SENTENCE":
                return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, sentence:action.payload.sentence} : instruction)}
            case "SET_INSTRUCTION_HOUR":
                console.log(checkNumber(action.payload.value))
                console.log(state)
                if(checkNumber(action.payload.value)){
                    console.log("GO")
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, hour:parseInt(action.payload.value)} : instruction)}
                }else{
                    return state
                }
            case "SET_INSTRUCTION_MINUTE":
                if(checkNumber(action.payload.value)){
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, minute:parseInt(action.payload.value)} : instruction)}
                }else{
                    return state
                }
            case "SET_INSTRUCTION_SECONDE":
                if(checkNumber(action.payload.value)){
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, seconde:parseInt(action.payload.value)} : instruction)}
                }else{
                    return state
                }
            default:
                return state
        }
    }

    const [recipeState, recipeDispatch] = useReducer(recipeStateReducer, recipeInitialState)

    



    return(
        <div className={s.mainContainer}>

            <div className={s.part}>
                <div className={`${s.section}`}>
                    <label htmlFor="">Nom</label>
                    <input onChange={(e) => recipeDispatch({type:"SET_RECIPE_NAME", payload:e.currentTarget.value})} type="text" className={`${s.dark}`} value={recipeState.recipeName} />
                </div>
            </div>

            <div className={s.part}>

                {/* Materiel */}
                <div className={`${s.section} ${s.materials}`}>
                    <label htmlFor="">Matériel</label>
                    <div className={`${s.container}`}>
                        {recipeState.materials.map(material => (
                            <input onChange={(e) => recipeDispatch({type:"SET_MATERIAL", payload:{id:material.id, name:e.currentTarget.value}})} key={material.id} type="text" className={`${s.dark}`} value={material.name}/>
                        ))}
                        <button onClick={() => recipeDispatch({type:"ADD_MATERIAL"})}>
                            <i className={`fa-solid fa-plus ${s.dark}`}></i>
                        </button>
                    </div>
                </div>

                {/* Ingredient */}
                <div className={`${s.section} ${s.ingredients}`}>

                    <label htmlFor="">Ingrédients</label>
                    <div className={`${s.container}`}>
                        {recipeState.ingredients.map(ingredient => (
                            <div key={ingredient.id} className={`${s.ingredient}`}>
                                <input onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_NAME", payload:{id:ingredient.id, name:e.currentTarget.value}})} className={`${s.name} ${s.dark}`} type="text" value={ingredient.name} />
                                <input onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_WEIGHT", payload:{id:ingredient.id, weight:parseInt(e.currentTarget.value)}})} className={`${s.weight} ${s.light}`} type="number" value={ingredient.weight ? ingredient.weight : ""} />
                            </div>
                        ))}
                        <button  onClick={() => recipeDispatch({type:"ADD_INGREDIENT"})}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

                {/* Etape */}
                <div className={`${s.section} ${s.steps}`}>

                    <label htmlFor="">Instructions</label>
                    <div className={`${s.container}`}>
                        <div className={`${s.informations} ${s.steps}`}>
                            <span>H.</span>
                            <span>Min.</span>
                            <span>Sec.</span>
                        </div>
                        {recipeState.instructions.map(instruction => (
                            <div key={instruction.id} className={`${s.step}`}>
                                <input onChange={() => null} className={`${s.stepNumber} ${s.light}`} type="number" value={instruction.step} />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SENTENCE", payload:{id:instruction.id, sentence:e.currentTarget.value}})} className={`${s.instruction} ${s.dark}`} type="text" value={instruction.sentence} />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_HOUR", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={nullNumber(instruction.hour)} onClick={removeNullNumber} type="text" />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_MINUTE", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={nullNumber(instruction.minute)} onClick={removeNullNumber} type="text" />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SECONDE", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={nullNumber(instruction.seconde)} onClick={removeNullNumber} type="text" />
                            </div>
                        ))}
                        <button onClick={() => recipeDispatch({type:"ADD_INSTRUCTION"})}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}