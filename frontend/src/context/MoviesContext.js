import { createContext, useReducer } from 'react'


export const MoviesContext = createContext()

export const moviesReducer = (state, action) => {
    switch(action.type) {
        case 'GET_MOVIES':
            return { 
                movies: action.payload 
            }
        case 'CREATE_MOVIE':
            return { 
                movies: [action.payload, ...state.movies]
            }
        default:
            return state
    }
}

export const MoviesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        moviesReducer, 
        { movies: null }
        )

    return(
        <MoviesContext.Provider value={ {...state, dispatch} }>
            { children }
        </MoviesContext.Provider>
    )
}