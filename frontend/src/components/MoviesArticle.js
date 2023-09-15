import { useMoviesContext } from '../hooks/useMoviesContext'

const Movies = ({ movie }) => {

    const movieDate = new Date(movie.creationDate).toISOString().slice(0, 10)
    const { dispatch } = useMoviesContext()
    
    const handleClick = async () => {
    
        fetch('http://localhost:4000/movies/' + movie.id, {method: 'DELETE'})
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {                   
                    dispatch({
                        type: 'DELETE_MOVIE',
                        payload: movie
                    })
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return(
        <article className="movie-details">
            <img alt={movie.title}></img>
            <h4>{movie.title}</h4>
            <p>Rating: {movie.rating}</p>
            <p>Date: {movieDate}</p>
            <span onClick={handleClick}>Delete</span>
        </article>
    )
}

export default Movies