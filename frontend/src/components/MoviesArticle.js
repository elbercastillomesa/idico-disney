const Movies = ({ movie }) => {

    let movieDate = new Date(movie.creationDate).toISOString().slice(0, 10)

    return(
        <article className="movie-details">
            <img alt={movie.title}></img>
            <h4>{movie.title}</h4>
            <p>Rating: {movie.rating}</p>
            <p>Date: {movieDate}</p>
        </article>
    )
}

export default Movies