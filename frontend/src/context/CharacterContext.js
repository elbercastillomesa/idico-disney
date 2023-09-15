import { createContext, useReducer } from 'react'


export const CharacterContext = createContext()

export const characterReducer = (state, action) => {
    switch(action.type) {
        case 'GET_CHARACTERS':
            return { 
                characters: action.payload 
            }
        case 'CREATE_CHARACTER':
            return { 
                characters: [action.payload, ...state.characters]
            }
        case 'DELETE_CHARACTER':
            return {
                characters: state.characters.filter( (character) => character.id !== action.payload.id )
            }
        case 'UPDATE_CHARACTER':            
            return {
                characters: state.characters.map(character => character.id === action.payload.id ? action.payload : character)
            }
        default:
            return state
    }
}

export const CharacterContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        characterReducer, 
        { characters: null }
        )

    return(
        <CharacterContext.Provider value={ {...state, dispatch} }>
            { children }
        </CharacterContext.Provider>
    )
}