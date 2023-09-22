import { useEffect } from 'react'
import { useMoviesContext } from '../hooks/useMoviesContext'
import MoviesArticle from '../components/MoviesArticle'
import MoviesForm from '../components/MoviesForm'
import { useAuthContext } from '../hooks/useAuthContext'

const Movie = () => {

    const {movies, dispatch} = useMoviesContext()
    const { user } = useAuthContext()

    useEffect( 
        () => {
            const fetchMovies = async () => {
                const response = await fetch(
                    'http://localhost:4000/movies',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                )
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_MOVIES', 
                        payload: json
                    })
                }
            }
            
            if (user) {
                fetchMovies()
            }            
        }, 
        [dispatch, user]
    )

    const movieIterator = () => {
        return movies?.map(
            (movie) => (                
                <MoviesArticle key={movie.id} movie={movie} />
            )
        )
    }

    return (        
        <section className="movies-tab">
            <div className="movies-list">
                {movieIterator()}
            </div>            
            <MoviesForm />
        </section>
    )
}

export default Movie;