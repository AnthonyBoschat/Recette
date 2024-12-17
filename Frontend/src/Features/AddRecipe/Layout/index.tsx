import { BaseSyntheticEvent, useReducer } from "react"
import s from "./style.module.scss"
import IDService from "@Services/IDService"
import { useMutation } from "@apollo/client"
import { CREATE_RECETTE } from "@Mutation/CreateRecette"
import { useDispatch } from "react-redux"
import { addRecette } from "@Redux/Slices/RecetteSlice"
import AddMaterials from "../Components/AddMaterials"
import AddIngredients from "../Components/AddIngredients"
import AddSteps from "../Components/AddSteps"
import { instructionType, recipeType } from "@Shared/Types/Recipe"
import AddRecipeName from "../Components/AddRecipeHeader"
import AddRecipeHeader from "../Components/AddRecipeHeader"

type recipeAction = 
{type:"SET_RECIPE_NAME", payload:string}
|{type:"ADD_MATERIAL"}
|{type:"SET_MATERIAL", payload:{id:number, name:string}}
|{type:"DELETE_MATERIAL", payload:number}
|{type:"ADD_INGREDIENT"}
|{type:"SET_INGREDIENT_NAME", payload:{id:number, name:string}}
|{type:"SET_INGREDIENT_WEIGHT", payload:{id:number, weight:number}}
|{type:"DELETE_INGREDIENT", payload:number}
|{type:"ADD_INSTRUCTION"}
|{type:"SET_INSTRUCTION_SENTENCE", payload:{id:number, sentence:string}}
|{type:"SET_INSTRUCTION_HOURs", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_MINUTES", payload:{id:number, value:string}}
|{type:"SET_INSTRUCTION_SECONDES", payload:{id:number, value:string}}
|{type:"DELETE_INSTRUCTION", payload:number}
|{type:"REORDER_INSTRUCTIONS", payload:instructionType[]}
|{type:"RESET_RECIPESTATE"}

export default function AddRecipeLayout(){

    const dispatch = useDispatch()

    const checkNumber = (durationValue:string) => {
        if(durationValue === ""){
            return true
        }
        return /^\d+$/.test(durationValue)
    }

    const getNextStep = (instructions : instructionType[]) => {
        if(instructions.length !== 0){
            return Math.max(...instructions.map(instruction => instruction.step)) + 1
        }else{
            return 1
        }
    }

    const recipeInitialState:recipeType = {
        name:"Baguette de tradition française",
        materials:[{id:0, name:"Pétrin axe oblique"}],
        ingredients:[
            {id:0, name:"Farine", weight:1000},
            {id:1, name:"Eau", weight:650},
            {id:2, name:"Sel", weight:18},
            {id:3, name:"Levure", weight:8},
        ],
        instructions:[
            {id:0, step:1, sentence:"Mettre la farine et l’eau dans la cuve et pétrir pendant 3 minutess jusqu’à obtenir une pâte bâtarde.", hours:"-", minutes:"-", secondes:"-"},
            {id:1, step:2, sentence:"Laisser reposer la pâte dans la cuve couvert d’un linge pendant 30 minutes.", hours:"-", minutes:"-", secondes:"-"},
            {id:2, step:3, sentence:"Incorporer la levure dans la pâte.", hours:"-", minutes:"-", secondes:"-"},
        ]
    }

    // const recipeInitialState:recipeType = {
    //     name:"",
    //     materials:[{id:0, name:""}],
    //     ingredients:[
    //         {id:0, name:"", weight:0},
    //     ],
    //     instructions:[
    //         {id:0, step:1, sentence:"", hours:"-", minutes:"-", secondes:"-"},
    //     ]
    // }

    const recipeStateReducer = (state:recipeType, action:recipeAction):recipeType => {
        let step = 1
        switch(action.type){
            case "RESET_RECIPESTATE":

                return recipeInitialState
            case "SET_RECIPE_NAME":

                return {...state, name:action.payload}
            case "ADD_MATERIAL":
                return {...state, materials:[...state.materials, {id:IDService.getNextID(state.materials), name:""}]}
            case "SET_MATERIAL":
                return {...state, materials:state.materials.map(material => material.id === action.payload.id ? {...material, name:action.payload.name} : material)}
            case "DELETE_MATERIAL":

                return {...state, materials:state.materials.filter(material => material.id !== action.payload)}
            case "ADD_INGREDIENT":
                return {...state, ingredients:[...state.ingredients, {id:IDService.getNextID(state.ingredients), name:"", weight:null}]}
            case "SET_INGREDIENT_NAME":
                return {...state, ingredients:state.ingredients.map(ingredient => ingredient.id === action.payload.id ? {...ingredient, name:action.payload.name} : ingredient)}
            case "SET_INGREDIENT_WEIGHT":
                return {...state, ingredients:state.ingredients.map(ingredient => ingredient.id === action.payload.id ? {...ingredient, weight:action.payload.weight} : ingredient)}
            case "DELETE_INGREDIENT":
                return {...state, ingredients:state.ingredients.filter(ingredient => ingredient.id !== action.payload)}

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

            case "DELETE_INSTRUCTION":
                const newInstructions = state.instructions.filter(instruction => instruction.id !== action.payload)
                newInstructions.map(instruction => {
                    instruction.step = step
                    step ++
                    return instruction
                })
                
                return {...state, instructions:newInstructions}

            case "REORDER_INSTRUCTIONS":
                const reorderedInstruction = action.payload
                reorderedInstruction.forEach(instruction => {
                    instruction.step = step
                    step++
                })
                state.instructions = reorderedInstruction
                console.log(state)
                return state

            default:
                return state
        }
    }

    const [recipeState, recipeDispatch] = useReducer(recipeStateReducer, recipeInitialState)
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

            <div className={`${s.part} ${s.header}`}>
                <AddRecipeHeader recipeState={recipeState} recipeDispatch={recipeDispatch} s={s}/>
            </div>
            <div className={s.part}>
                <AddMaterials recipeState={recipeState} recipeDispatch={recipeDispatch} s={s}/>
                <AddIngredients recipeState={recipeState} recipeDispatch={recipeDispatch} s={s}/>
                <AddSteps recipeState={recipeState} recipeDispatch={recipeDispatch} s={s}/>
            </div>
        </form>
    )
} 