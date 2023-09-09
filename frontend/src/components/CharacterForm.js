import { useState } from "react"

const CharacterForm = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [history, setHistory] = useState('')    
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const character = {image, name, age, weight, history}

        const response = await fetch(
            '/characters',
            {
                method: 'POST',
                body: JSON.stringify(character),                
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
            setName('')
            setAge('')
            setWeight('')
            setHistory('')
            setError(null)            
        }
    }

    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Character</h3>
            
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
                onChange={ (e) => setAge(e.target.value) }
                value={age}
            />            

            <label>Weight</label>
            <input 
                type="number"
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

            { error && <div className="error">{error}</div> }

        </form>
    )
}

export default CharacterForm