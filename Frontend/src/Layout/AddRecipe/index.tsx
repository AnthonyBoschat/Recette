import { BaseSyntheticEvent, useReducer } from "react"
import s from "./style.module.scss"
import IDService from "@Services/IDService"
import { useMutation } from "@apollo/client"
import { CREATE_RECETTE } from "@Mutation/CreateRecette"
import { useDispatch } from "react-redux"
import { addRecette } from "@Redux/Slices/RecetteSlice"

interface ingredientType{
    id:number
    name:string
    weight:number|null
}

interface instructionType{
    id:number
    step:number
    sentence:string
    hours:number|string
    minutes:number|string
    secondes:number|string
}

interface materialType{
    id:number
    name:string
}

interface recipeType{
    name:string
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
|{type:"SET_INSTRUCTION_HOURs", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_MINUTES", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_SECONDES", payload:{id:number, value:string}}
|{type:"RESET_RECIPESTATE"}

export default function AddRecipeLayout(){


    const removeNullNumber = (e:BaseSyntheticEvent) => {
        if(e.currentTarget.value === "-"){
            e.currentTarget.value = ""
        }
    }
    const addNullNumber = (e:BaseSyntheticEvent) => {
        if(e.currentTarget.value === "" || e.currentTarget.value === "0"){
            e.currentTarget.value = "-"
        }
    }

    const checkNumber = (durationValue:string) => {
        if(durationValue === ""){
            return true
        }
        return /^\d+$/.test(durationValue)
    }

    const getNextStep = (instructions : instructionType[]) => {
        return Math.max(...instructions.map(instruction => instruction.step)) + 1
    }

    // const recipeInitialState:recipeType = {
    //     name:"Baguette de tradition française",
    //     materials:[{id:0, name:"Pétrin axe oblique"}],
    //     ingredients:[
    //         {id:0, name:"Farine", weight:1000},
    //         {id:1, name:"Eau", weight:650},
    //         {id:2, name:"Sel", weight:18},
    //         {id:3, name:"Levure", weight:8},
    //     ],
    //     instructions:[
    //         {id:0, step:1, sentence:"Mettre la farine et l’eau dans la cuve et pétrir pendant 3 minutess jusqu’à obtenir une pâte bâtarde.", hours:"-", minutes:"-", secondes:"-"},
    //         {id:1, step:2, sentence:"Laisser reposer la pâte dans la cuve couvert d’un linge pendant 30 minutess.", hours:"-", minutes:"-", secondes:"-"},
    //         {id:2, step:3, sentence:"Incorporer la levure dans la pâte.", hours:"-", minutes:"-", secondes:"-"},
    //     ]
    // }

    const recipeInitialState:recipeType = {
        name:"",
        materials:[{id:0, name:""}],
        ingredients:[
            {id:0, name:"", weight:0},
        ],
        instructions:[
            {id:0, step:1, sentence:"", hours:"-", minutes:"-", secondes:"-"},
        ]
    }

    const recipeStateReducer = (state:recipeType, action:recipeAction):recipeType => {
        switch(action.type){
            case "RESET_RECIPESTATE":
                return recipeInitialState
            case "SET_RECIPE_NAME":
                return {...state, name:action.payload}
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
                return {...state, instructions:[...state.instructions, {id:IDService.getNextID(state.instructions), step:getNextStep(state.instructions), sentence:"", hours:"-", minutes:"-", secondes:"-"}]}
            case "SET_INSTRUCTION_SENTENCE":
                return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, sentence:action.payload.sentence} : instruction)}
            case "SET_INSTRUCTION_HOURs":
                if(checkNumber(action.payload.value)){
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, hours:action.payload.value !== "" ? parseInt(action.payload.value) : "-"} : instruction)}
                }else{
                    return state
                }
            case "SET_INSTRUCTION_MINUTES":
                if(checkNumber(action.payload.value)){
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, minutes:action.payload.value !== "" ? parseInt(action.payload.value) : "-"} : instruction)}
                }else{
                    return state
                }
            case "SET_INSTRUCTION_SECONDES":
                if(checkNumber(action.payload.value)){
                    return {...state, instructions:state.instructions.map(instruction => instruction.id === action.payload.id ? {...instruction, secondes:action.payload.value !== "" ? parseInt(action.payload.value) : "-"} : instruction)}
                }else{
                    return state
                }
            default:
                return state
        }
    }

    const [recipeState, recipeDispatch] = useReducer(recipeStateReducer, recipeInitialState)
    const dispatch = useDispatch()
    const [createRecette, { data, loading, error }] = useMutation(CREATE_RECETTE, {
        onCompleted: (data) => {
            console.log(data)
            recipeDispatch({type:"RESET_RECIPESTATE"})
            dispatch(addRecette(data.createRecette.recette))
        },
        onError: (error) => {
            console.error("Erreur lors de la création de la recette")
        }
    });

    const handleSubmit = async (e:BaseSyntheticEvent) => {
        e.preventDefault()
        const variables = {
            name:recipeState.name,
            materials:recipeState.materials,
            ingredients:recipeState.ingredients,
            instructions:recipeState.instructions.map(instruction => {
                instruction.hours = instruction.hours === "-" ? 0 : instruction.hours
                instruction.minutes = instruction.minutes === "-" ? 0 : instruction.minutes
                instruction.secondes = instruction.secondes === "-" ? 0 : instruction.secondes
                return instruction
            })
        }
        createRecette({variables:variables})
    }



    return(
        <form onSubmit={handleSubmit} className={s.mainContainer}>

            {/* Nom de la recette */}
            <div className={`${s.part} ${s.header}`}>
                <div className={`${s.section}`}>
                    <label htmlFor="">Nom</label>
                    <input required onChange={(e) => recipeDispatch({type:"SET_RECIPE_NAME", payload:e.currentTarget.value})} type="text" className={`${s.dark}`} value={recipeState.name} />
                </div>
                <input type="submit" className={`${s.dark} ${s.submit}`} value={"Enregistrer la recette"} />
            </div>
            <div className={s.part}>

                {/* Materiel */}
                <div className={`${s.section} ${s.materials}`}>
                    <label htmlFor="">Matériel</label>
                    <div className={`${s.container}`}>
                        {recipeState.materials.map(material => (
                            <input required onChange={(e) => recipeDispatch({type:"SET_MATERIAL", payload:{id:material.id, name:e.currentTarget.value}})} key={material.id} type="text" className={`${s.dark}`} value={material.name}/>
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
                        <div className={`${s.informations} ${s.ingredients}`}>
                            <span>poid (g.)</span>
                        </div>
                        {recipeState.ingredients.map(ingredient => (
                            <div key={ingredient.id} className={`${s.ingredient}`}>
                                <input required onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_NAME", payload:{id:ingredient.id, name:e.currentTarget.value}})} className={`${s.name} ${s.dark}`} type="text" value={ingredient.name} />
                                <input required onChange={(e) => recipeDispatch({type:"SET_INGREDIENT_WEIGHT", payload:{id:ingredient.id, weight:parseInt(e.currentTarget.value)}})} className={`${s.light}`} type="number" value={ingredient.weight ? ingredient.weight : ""} />
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
                                <input required onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SENTENCE", payload:{id:instruction.id, sentence:e.currentTarget.value}})} className={`${s.instruction} ${s.dark}`} type="text" value={instruction.sentence} />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_HOURs", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.hours} onFocus={removeNullNumber} type="text" />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_MINUTES", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.minutes} onFocus={removeNullNumber} type="text" />
                                <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SECONDES", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.secondes} onFocus={removeNullNumber} type="text" />
                            </div>
                        ))}
                        <button onClick={() => recipeDispatch({type:"ADD_INSTRUCTION"})}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

            </div>

            

        </form>
    )
}