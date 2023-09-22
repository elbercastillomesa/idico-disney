import { useEffect } from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext' 
import CharacterArticle from '../components/CharacterArticle'
import CharacterForm from '../components/CharacterForm'
import { useAuthContext } from '../hooks/useAuthContext'

const Character = () => {

    const {characters, dispatch} = useCharacterContext()
    const { user } = useAuthContext()

    useEffect( 
        () => {
            const fetchCharacters = async () => {
                const response = await fetch(
                    'http://localhost:4000/characters',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                )
                const json = await response.json()

                if (response.ok) {
                    dispatch({
                        type: 'GET_CHARACTERS',
                        payload: json
                    })
                }
            }
            
            if (user) {
                fetchCharacters()
            }
        }, 
        [dispatch, user]
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