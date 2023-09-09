import { useState } from "react"

const MoviesForm = () => {

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const movie = {image, title, creationDate, rating}

        const response = await fetch(
            'http://localhost:4000/movies',
            {
                method: 'POST',
                body: JSON.stringify(movie),                
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )

        const json = await response.json

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setImage('')
            setTitle('')
            setCreationDate('')
            setRating('')
            setError(null)            
        }
    }

    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Movie or Serie</h3>
            
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
                onChange={ (e) => setRating(e.target.value) }
                value={rating}
            />

            <button>Add Movie or Serie</button>

            { error && <div className="error">{error}</div> }

        </form>
    )
}

export default MoviesForm