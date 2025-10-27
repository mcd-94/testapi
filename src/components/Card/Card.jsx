import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="border rounded-md flex flex-col justify-between overflow-hidden">
      <div>
        {image && (
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        )}
      </div>
      <div className="border-0 border-t-1 text-center">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Card;
