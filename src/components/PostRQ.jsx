import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PostRQ = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime: 30000 //To clear the stale at regular intervals of given time
    // refetchInterval: 1000, //Helps us to poll every second or desired time
    // refetchIntervalInBackground: true /*By setting this to true even when you're in sperate tab it won't stop fetching */,
    enabled: false, //It won't allow automatic fetching, only allow manual fetching and provide 'refetch' fn to do it
  });

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch</button>
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
