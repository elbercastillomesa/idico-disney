import React, { useState } from 'react';
import { useCharacterContext } from '../hooks/useCharacterContext'

const CharacterArticle = ({ character }) => {

    const { dispatch } = useCharacterContext()

    const [editing, setEditing] = useState(false);
    let [formData, setFormData] = useState(character);
    const [error, setError] = useState(null)

    const handleEdit = () => {
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault()

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };

        fetch('http://localhost:4000/characters/' + character.id, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.error) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {
                    setEditing(false);
                    dispatch({
                        type: 'UPDATE_CHARACTER',
                        payload: formData
                    })
                }
            })
            .catch(error => {
                setError(error)
                console.error('There was an error!', error);
            });
    };

    const handleDelete = async () => {

        fetch('http://localhost:4000/characters/' + character.id, { method: 'DELETE' })
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
                        type: 'DELETE_CHARACTER',
                        payload: character
                    })
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (       
        <div>
            {editing ? (
                <article className="character-details">
                    <form className="editing" onSubmit={handleUpdate}>

                        <h3>Edit the Character</h3>

                        {error && <div className="error">{error}</div>}

                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <label>Thumbnail</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />

                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            min="1"
                            max="9999"
                            step="1"
                            value={formData.age}
                            onChange={handleChange}
                        />

                        <label>Weight (Kg)</label>
                        <input
                            type="number"
                            name="weight"
                            min="1"
                            max="9999"
                            step="1"
                            value={formData.weight}
                            onChange={handleChange}
                        />

                        <label>History</label>
                        <textarea
                            name="history"
                            rows="6"
                            cols="50"
                            type="textarea"
                            value={formData.history}
                            onChange={handleChange}
                        ></textarea>

                        <button>Save Changes</button>
                        <button type="button" className='discard' onClick={cancelEdit}>Discard Changes</button>
                    </form>
                </article>
            ) : (
                <article className="character-details">
                    <div className='details'>
                        <img alt={character.name}></img>
                        <h4>{character.title}</h4>
                        <p>Age: {character.age}</p>
                        <p>Weight: {character.weight}</p>
                        <p>History: {character.history}</p>
                    </div>
                    <div className='actions'>
                        <button type="button" className='edit' onClick={handleEdit}>
                            Edit Character
                        </button>
                        <span className='delete' onClick={handleDelete}>Delete</span>
                    </div>
                </article>
            )}
        </div>
    )
}

export default CharacterArticle