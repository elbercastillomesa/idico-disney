import React, { useState } from 'react';
import { useMoviesContext } from '../hooks/useMoviesContext'

const Movies = ({ movie }) => {

  const { dispatch } = useMoviesContext()

  const [editing, setEditing] = useState(false);
  let [formData, setFormData] = useState(movie);
  const [error, setError] = useState(null)

  const movieDate = (date) => {
    let movieDate = date && new Date(date).toISOString().slice(0, 10)
    return movieDate
  };

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

    const creationDate = movieDate(formData.creationDate)
    formData = { ...formData, creationDate }

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    fetch('http://localhost:4000/movies/' + movie.id, requestOptions)
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
            type: 'UPDATE_MOVIE',
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

    fetch('http://localhost:4000/movies/' + movie.id, { method: 'DELETE' })
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
            type: 'DELETE_MOVIE',
            payload: movie
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
        <article className="movie-details">
          <form className="editing" onSubmit={handleUpdate}>
            
            <h3>Edit the Movie</h3>

            {error && <div className="error">{error}</div>}

            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <label>Thumbnail</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />

            <label>Premiere Date</label>
            <input
              type="date"
              name="creationDate"
              value={movieDate(formData.creationDate)}
              onChange={handleChange}
            />

            <label>Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="1"
              value={formData.rating}
              onChange={handleChange}
            />

            <button>Save Changes</button>
            <button type="button" className='discard' onClick={cancelEdit}>Discard Changes</button>
          </form>
        </article>
      ) : (
        <article className="movie-details">
          <div className='details'>
            <img alt={movie.title}></img>
            <h4>{movie.title}</h4>
            <p>Rating: {movie.rating}</p>
            <p>Date: {movieDate(movie.creationDate)}</p>
          </div>
          <div className='actions'>
            <button type="button" className='edit' onClick={handleEdit}>
              Edit Movie
            </button>
            <span className='delete' onClick={handleDelete}>Delete</span>
          </div>
        </article>
      )}
    </div>
  )
}

export default Movies