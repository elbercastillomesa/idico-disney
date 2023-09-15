import { useEffect } from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext' 
import CharacterArticle from '../components/CharacterArticle'
import CharacterForm from '../components/CharacterForm'

const Character = () => {

    const {characters, dispatch} = useCharacterContext()

    useEffect( 
        () => {
            const fetchCharacters = async () => {
                const response = await fetch('http://localhost:4000/characters')
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_CHARACTERS',
                        payload: json
                    })
                }
            }
            fetchCharacters()
        }, 
        [dispatch]
    )

    const characterIterator = () => {
        return characters?.map(
            (character) => (                
                <CharacterArticle key={character.id} character={character} />
            )
        )
    }

    return (        
        <section className="character-tab">
            <div className="character-list">
                {characterIterator()}
            </div>
            <CharacterForm />
        </section>                
    )
}

export default Character;