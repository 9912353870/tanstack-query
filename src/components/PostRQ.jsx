import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PostRQ = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    //staleTime: 30000
    refetchInterval: 1000, //Helps us to poll every second or desired time
    refetchIntervalInBackground: true /*By setting this to true even when you're in sperate tab it won't stop fetching */,
  });

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="post-list">
      {data &&
        data?.data?.map((item) => {
          return (
            <div className="post-item" key={item.id}>
              <h3 className="post-title">{item.title}</h3>
              <p className="post-body">{item.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default PostRQ;
