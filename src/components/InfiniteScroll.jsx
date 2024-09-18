import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) =>
  axios.get(`http://localhost:4000/countries?_limit=10&_page=${pageParam}`);

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchNextPageError } =
    useInfiniteQuery({
      queryKey: ["countries"],
      queryFn: fetchFruits,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allpages) =>
        allpages.length < 5 ? allpages.length + 1 : undefined,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="container">
      {data?.pages.map((page) => {
        return page?.data.map((item) => <div key={item.id} className="post-item">{item.name}</div>);
      })}
      <div ref={ref}>{isFetchNextPageError && 'Loading...' }</div>
    </div>
  );
};

export default InfiniteScroll;
