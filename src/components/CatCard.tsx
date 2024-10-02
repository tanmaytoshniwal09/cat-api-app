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
      className="relative overflow-hidden rounded-xl transition-all transform hover:scale-105 cursor-pointer p-2"
      onClick={() => onClick(imageUrl)}
      style={{
        maxWidth: "400px",
        maxHeight: "400px",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={imageUrl}
        alt="Cat"
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110 hover:brightness-110"
        style={{
          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
          transition: "transform 0.3s ease, filter 0.3s ease",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-40 transition-opacity duration-300 rounded-lg"
        style={{
          borderRadius: "inherit",
        }}
      />
    </div>
  );
};

export default CatCard;
