import React from "react";

const Card = ({
  title,
  description,
  image,
  displayTitle,
  displayDescription,
  border,
  shadow,
}) => {
  return (
    <div
      className={`
        rounded-md
        flex flex-col
        justify-between
        overflow-hidden
        ${shadow ? "shadow-sm" : ""}
        ${border ? "border" : ""}
      `}
    >
      {image && (
        <img
          src={image}
          alt={title || "Card image"}
          className="w-full h-auto object-cover"
        />
      )}
      {(displayTitle || displayDescription) && (
        <div className="border-t text-center p-3">
          {displayTitle && title && (
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
          )}
          {displayDescription && description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
