import { useState } from "react"
import { useMoviesContext } from '../hooks/useMoviesContext'

const MoviesForm = () => {

    const { dispatch } = useMoviesContext()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const movie = { image, title, creationDate, rating }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie),
        };

        fetch('http://localhost:4000/movies', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    setImage('')
                    setTitle('')
                    setCreationDate('')
                    setRating('')
                    setError(null)
                    dispatch({
                        type: 'CREATE_MOVIE', 
                        payload: data
                    })
                }
            })
            .catch(error => {
                setError(error)
                console.error('There was an error!', error);
            });
    }

    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Movie or Serie</h3>

            {error && <div className="error">{error}</div>}

            <label>Title</label>
            <input
                type="text"
                onChange={ (e) => setTitle(e.target.value) }
                value={title}
            />

            <label>Thumbnail</label>
            <input
                type="text"
                onChange={ (e) => setImage(e.target.value) }
                value={image}
            />

            <label>Premiere Date</label>
            <input
                type="date"
                onChange={ (e) => setCreationDate(e.target.value) }
                value={creationDate}
            />

            <label>Rating</label>
            <input
                type="number"
                min="0"
                max="5"
                step="1"
                onChange={ (e) => setRating(e.target.value) }
                value={rating}
            />

            <button>Add Movie or Serie</button>

        </form>
    )
}

export default MoviesForm