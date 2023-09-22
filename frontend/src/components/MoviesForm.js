import { useState } from "react"
import { useMoviesContext } from '../hooks/useMoviesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const MoviesForm = () => {

    const { dispatch } = useMoviesContext()
    const { user } = useAuthContext()

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState( [] )
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('The user should be logged in')
            return
        }

        const movie = { image, title, creationDate, rating }

        const requestOptions = {
            method: 'POST',            
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },            
        };

        fetch('http://localhost:4000/movies', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = data || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    setImage('')
                    setTitle('')
                    setCreationDate('')
                    setRating('')
                    setError(null)
                    setEmptyFields( [] )
                    dispatch({
                        type: 'CREATE_MOVIE', 
                        payload: data
                    })
                }
            })
            .catch(error => {
                setError(error.error)
                setEmptyFields(error.emptyFields)
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
                className={emptyFields.includes('title') ? 'error' : '' }
            />

            <label>Thumbnail</label>
            <input
                type="text"
                onChange={ (e) => setImage(e.target.value) }
                value={image}
                className={emptyFields.includes('image') ? 'error' : '' }
            />

            <label>Premiere Date</label>
            <input
                type="date"
                onChange={ (e) => setCreationDate(e.target.value) }
                value={creationDate}
                className={emptyFields.includes('creationDate') ? 'error' : '' }
            />

            <label>Rating</label>
            <input
                type="number"
                min="0"
                max="5"
                step="1"
                onChange={ (e) => setRating(e.target.value) }
                value={rating}
                className={emptyFields.includes('rating') ? 'error' : '' }
            />

            <button>Add Movie or Serie</button>

        </form>
    )
}

export default MoviesForm