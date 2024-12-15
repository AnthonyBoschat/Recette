export interface ingredientType{
    id:number
    name:string
    weight:number|null
}

export interface instructionType{
    id:number
    step:number
    sentence:string
    hours:number|string
    minutes:number|string
    secondes:number|string
}

export interface materialType{
    id:number
    name:string
}

export interface recipeType{
    name:string
    materials:materialType[]
    ingredients:ingredientType[]
    instructions:instructionType[]
}