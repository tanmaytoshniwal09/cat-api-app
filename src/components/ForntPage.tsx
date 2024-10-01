import React, { useState } from "react";
import { useGetCats } from "../hooks/useGetCats";
import CatCard from "./CatCard";
import Modal from "./Modal";
import Loader from "./loader";

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const FrontPage: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useGetCats();

  const [catList, setCatList] = useState<Cat[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  React.useEffect(() => {
    if (data?.pages) {
      const newList = data.pages.flatMap(
        (page) => (page as { cats: Cat[] }).cats || []
      );
      setCatList(newList);
    }
  }, [data]);

  const handleCardClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          fetchNextPage();
          setIsLoadingMore(false);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoadingMore]);

  return (
    <div className="p-6 min-h-screen bg-black">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-500 mt-8">
        Cat Gallery
      </h1>
      {/* Centered Grid container for the images */}
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              {error instanceof Error
                ? `Error: ${error.message}`
                : "An error occurred"}
            </p>
          ) : catList.length === 0 ? (
            <p>No Cats Found</p>
          ) : (
            catList.map((cat) => (
              <CatCard
                key={cat.id}
                imageUrl={cat.url}
                width={cat.width}
                height={cat.height}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>
      </div>
      {isFetchingNextPage && !isLoadingMore && <p>Loading more...</p>}
      {isLoadingMore && <Loader />}{" "}
      {!hasNextPage && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          No more cats to load.
        </p>
      )}
      <Modal
        isOpen={isModalOpen}
        imageUrl={selectedImage || ""}
        onClose={handleCloseModal}
      />
    </div>
  );
};
