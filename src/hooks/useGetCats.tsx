import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCats = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${
      pageParam === 1 ? 20 : 10
    }&page=${pageParam}&order=Desc`
  );

  // Check if the response is okay
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }

  const data = await response.json();

  return {
    cats: data,
    nextPage: data.length > 0 ? pageParam + 1 : undefined,
  };
};

export const useGetCats = () => {
  return useInfiniteQuery(
    ["cats"], // Query key
    fetchCats, // Query function with pagination
    {
      getNextPageParam: (lastPage) => {
        // Stop pagination when no more cats are available
        return lastPage.nextPage ?? undefined;
      },
      staleTime: 5 * 60 * 1000, // Optional: cache the data for 5 minutes
    }
  );
};
