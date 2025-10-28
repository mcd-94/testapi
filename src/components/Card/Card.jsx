import React from "react";

const Card = ({
  title,
  titleSize,
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
        ${shadow ? "shadow-md" : ""}
        ${border ? "border border-[#c0c0c0]" : ""}
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
        <div className="border-t border-[#c0c0c0] text-center p-3">
          {displayTitle && title && (
            <h3
              className={`
              font-semibold mb-1
              ${titleSize}
              `}
            >
              {title}
            </h3>
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
