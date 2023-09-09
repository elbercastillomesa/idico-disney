import { useEffect, useState } from 'react'

// Components
import CharacterArticle from '../components/CharacterArticle'
import CharacterForm from '../components/CharacterForm'

const Character = () => {

    const [ characters, setCharacters ] = useState(null)

    useEffect( 
        () => {
            const fetchCharacters = async () => {
                const response = await fetch('http://localhost:4000/characters')
                const json = await response.json()

                if (response.ok) {
                    setCharacters(json)
                }
            }
            fetchCharacters()
        }, 
        []
    )

    const characterIterator = () => {
        return characters?.map(
            (character) => (                
                <CharacterArticle key={character.id} character={character} />
            )
        )
    }

    return (        
        <section className="character">                
            {characterIterator()}
            <CharacterForm />
        </section>
    )
}

export default Character;