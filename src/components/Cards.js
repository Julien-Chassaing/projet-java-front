import React from "react";

import { Link } from "react-router-dom";

const Cards = (props) => {
  const { image } = props;

  const session = () => {
    localStorage.setItem("image", JSON.stringify(image));
  };

  return (
    <li className="cards">
      <img src={image.link} alt={image.name} />
      <Link to="/image" style={{ color: "white" }} onClick={() => session()}>
        <div className="data-container">
          <ul>
            <li>{image.namews}</li>
          </ul>
        </div>
      </Link>
    </li>
  );
};

export default Cards;
