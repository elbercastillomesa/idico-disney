import { useEffect, useState } from 'react'

// Components
import MoviesArticle from '../components/MoviesArticle'
import MoviesForm from '../components/MoviesForm'

const Movie = () => {

    const [ movies, setMovies ] = useState(null)

    useEffect( 
        () => {
            const fetchMovies = async () => {
                const response = await fetch('http://localhost:4000/movies')     
                const json = await response.json()

                if (response.ok) {
                    setMovies(json)
                }
            }
            fetchMovies()
        }, 
        []
    )

    const movieIterator = () => {
        return movies?.map(
            (movie) => (                
                <MoviesArticle key={movie.id} movie={movie} />
            )
        )
    }

    return (        
        <section className="movies">                
            {movieIterator()}                
            <MoviesForm />
        </section>
    )
}

export default Movie;