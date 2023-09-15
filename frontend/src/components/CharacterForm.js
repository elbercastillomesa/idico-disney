import { useState } from "react"
import { useCharacterContext } from "../hooks/useCharacterContext"

const CharacterForm = () => {

    const { dispatch } = useCharacterContext()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [history, setHistory] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const character = {image, name, age, weight, history}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character),
        };

        fetch('http://localhost:4000/characters', requestOptions)
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
                    setName('')
                    setAge('')
                    setWeight('')
                    setHistory('')
                    setError(null)
                    dispatch({
                        type: 'CREATE_CHARACTER',
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
            <h3>Add a Character</h3>

            { error && <div className="error">{error}</div> }

            <label>Name</label>
            <input
                type="text"
                onChange={ (e) => setName(e.target.value) }
                value={name}
            />

            <label>Thumbnail</label>
            <input
                type="text"
                onChange={ (e) => setImage(e.target.value) }
                value={image}
            />

            <label>Age</label>
            <input
                type="number"
                min="1"
                max="9999"
                step="1"
                onChange={ (e) => setAge(e.target.value) }
                value={age}
            />

            <label>Weight (Kg)</label>
            <input
                type="number"
                min="1"
                max="9999"
                step="1"
                onChange={ (e) => setWeight(e.target.value) }
                value={weight}
            />

            <label>History</label>
            <textarea
                name="history"
                rows="6"
                cols="50"
                type="textarea"
                onChange={ (e) => setHistory(e.target.value) }
                value={history}
            >Add the character history...</textarea>

            <button>Add New Character</button>

        </form>
    )
}

export default CharacterForm