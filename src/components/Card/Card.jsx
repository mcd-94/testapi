import React from "react";

const Card = (drName, especialidad, img) => {
  return (
    <div className='border'>
      <img href={img}/>
      <h3>{drName}</h3>
    </div>
  );
}
export default Card;
