import React from "react";

interface CatCardProps {
  imageUrl: string;
  width: number;
  height: number;
  onClick: (url: string) => void;
}

const CatCard: React.FC<CatCardProps> = ({ imageUrl, onClick }) => {
  return (
    <div
      className="border rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all transform hover:scale-105 bg-white cursor-pointer p-2"
      onClick={() => onClick(imageUrl)}
      style={{
        maxWidth: "300px",
        maxHeight: "300px",
      }}
    >
      {" "}
      <img
        src={imageUrl}
        alt="Cat"
        className="w-full h-full object-cover p-2 rounded-lg"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default CatCard;
