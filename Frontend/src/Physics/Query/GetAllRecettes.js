import { gql } from '@apollo/client';

export const GET_ALL_RECETTES = gql`
    query allRecettes{
        allRecettes{
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
`