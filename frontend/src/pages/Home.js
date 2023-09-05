import { useEffect, useState } from 'react'

// Components
import Movies from '../components/Movies'
import MoviesForm from '../components/MoviesForm'

const Home = () => {

    const [ movies, setMovies ] = useState(null)

    useEffect( 
        () => {
            const fetchMovies = async () => {
                const response = await fetch('/movies')     
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
                <Movies key={movie.id} movie={movie} />
            )
        )
    }

    return (
        <div className="home">
            <section className="movies">                
                {movieIterator()}                
            </section>
            <MoviesForm />
        </div>
    )
}

export default Home;