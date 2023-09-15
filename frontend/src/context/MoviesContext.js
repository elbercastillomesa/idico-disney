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
        case 'DELETE_MOVIE':
            return {
                movies: state.movies.filter( (movie) => movie.id !== action.payload.id )
            }
        case 'UPDATE_MOVIE':            
            return {
                movies: state.movies.map(movie => movie.id === action.payload.id ? action.payload : movie)
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