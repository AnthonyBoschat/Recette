import { gql } from '@apollo/client';

export const CREATE_RECETTE = gql`
     mutation CreateRecette(
        $name: String!,
        $materials: [MaterialInput!],
        $ingredients: [IngredientInput!],
        $instructions: [InstructionInput!]
    ) {
        createRecette(
            name: $name,
            materials: $materials,
            ingredients: $ingredients,
            instructions: $instructions
        ) {
            success
            recette {
                id
                name
                materials {
                    id
                    name
                }
                ingredients {
                    id
                    name
                    weight
                }
                instructions {
                    id
                    step
                    sentence
                    hours
                    minutes
                    secondes
                }
            }
        }
    }
`