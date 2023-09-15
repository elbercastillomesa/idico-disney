import { useEffect } from 'react'
import { useMoviesContext } from '../hooks/useMoviesContext'
import MoviesArticle from '../components/MoviesArticle'
import MoviesForm from '../components/MoviesForm'

const Movie = () => {

    const {movies, dispatch} = useMoviesContext()

    useEffect( 
        () => {
            const fetchMovies = async () => {
                const response = await fetch('http://localhost:4000/movies')     
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_MOVIES', 
                        payload: json
                    })
                }
            }
            fetchMovies()
        }, 
        [dispatch]
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