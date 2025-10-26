import React from "react";

const Card = ({ name, description }) => {
  return (
    <div className="border rounded-md">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};
export default Card;
