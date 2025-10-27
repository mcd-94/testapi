import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="border rounded-md">
      <h3>{title}</h3>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-cover rounded mt-2"
        />
      )}
    </div>
  );
};
export default Card;
