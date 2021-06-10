import React from 'react'

function MovieCard({ movieName, movieReview }) {
    return (
        <div className="card">
            <h3 className="movieName">{movieName}</h3>
            <p className="movieReview">{movieReview}</p>
        </div>
    )
}

export default MovieCard
