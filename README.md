# Technical Test - Development with Node.js and React

## Objective:

Develop an API that allows exploring the Disney universe, making it easy to know and modify the characters, and understand the movies in which they participated. Additionally, it should expose the information in a way that any frontend can consume it.

## Tools to Use:

- Node.js
- Express.js
- MYSQL Database
- React with @mui React Text Field component - Material UI
- REST pattern for routes
- Sequelize library

## Delivery Instructions:

Publish the code on GitHub and share it with the user johanCarvajalRPA. Commits and branch management will be evaluated.

Divide the requirements into tasks and propose an estimate for them. Use the GitHub README for this purpose.

## Technical Requirements:

Below are a series of requirements that serve as guidelines. It is not necessary to implement all of them; select the ones you consider relevant for the interview, keeping in mind that the organization and code structure will be reviewed.

## Database Modeling:

**Character:** Should include:

- Image
- Name
- Age
- Weight
- History
- Associated movies or series

**Movie or Series:** Should include:

- Image
- Title
- Creation date
- Rating (from 1 to 5)
- Associated characters

**Genre:** Should include:

- Name
- Image
- Associated movies or series

**User Authentication:** To make requests to the following endpoints, the user needs a token obtained through authentication.

- Endpoints:
    - /auth/login
    - /auth/register

**List of Characters:** Should display:

- Image
- Name
- Endpoint: /characters

**Character CRUD Operations:** Include creation, editing (both with all model attributes), and soft deletion using Sequelize's paranoid feature.

**Character Details:** Display all attributes and related movies or series.

**Character Search:** Allow searching by name and filtering by age, weight, or movies/series.

**Examples:**

- GET /characters?name=name
- GET /characters?age=age
- GET /characters?movies=movieId

**List of Movies:** Display image, title, and creation date.

- **Endpoint:** GET /movies
- **Movie/Series Details with Characters:** Return all fields of the movie or series and the associated characters.

**Movie/Series CRUD Operations:** Creation, editing, and soft deletion.

**Movie/Series Search:** Allow searching by title, filtering by genre, and sorting by creation date (ascending or descending). Examples:

- GET /movies?name=name
- GET /movies?genre=genreId
- GET /movies?order=ASC | DESC