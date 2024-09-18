import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const fetchFruits = (pageId) =>
  axios.get(`http://localhost:4000/fruits?_limit=4&_page=${pageId}`);

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
  });

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="container">
      {data?.data?.map((item) => {
        return (
          <div key={item.id} className="fruit-label">
            {item.name}
          </div>
        );
      })}
      <button
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
        disabled={page <= 1 ? true : false}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
        disabled={page >= 5 ? true : false}
      >
        Next
      </button>
    </div>
  );
};

export default PaginatedQueries;
