import { useCharacterContext } from '../hooks/useCharacterContext'

const CharacterArticle = ({ character }) => {

    const { dispatch } = useCharacterContext()

    const handleClick = async () => {
    
        fetch('http://localhost:4000/characters/' + character.id, {method: 'DELETE'})
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

    return(
        <article className="character-details">
            <img alt={character.name}></img>
            <h4>{character.title}</h4>
            <p>Age: {character.age}</p>
            <p>Weight: {character.weight}</p>
            <p>History: {character.history}</p>
            <span onClick={handleClick}>Delete</span>
        </article>
    )
}

export default CharacterArticle