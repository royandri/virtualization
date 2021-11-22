import React from "react";

const MovieCard = ({
  title,
  rating,
  voteCount,
  releaseDate,
  image,
}) => {
  return (
    <div className="col">
      <div className="card-conteiner">
        <img 
          alt={title}
          src={image}
          height={170}
          width={285}

        />
        <div className="card-title">
          <a href="/" className="card-link">
            {title}
          </a>
        </div>

        <div className="card-date">
          &#9733; {rating} ({voteCount}) - {releaseDate}
        </div>
      </div>
    </div>
  )
}

export default React.memo(MovieCard);