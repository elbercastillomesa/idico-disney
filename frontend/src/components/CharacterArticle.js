const CharacterArticle = ({ character }) => {

    return(
        <article className="character-details">
            <img alt={character.name}></img>
            <h4>{character.title}</h4>
            <p>Age: {character.age}</p>
            <p>Weight: {character.weight}</p>
            <p>History: {character.history}</p>
        </article>
    )
}

export default CharacterArticle