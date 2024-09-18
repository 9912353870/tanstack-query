import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const fetchById = (id) => axios.get(`http://localhost:4000/posts/${id}`);

const PostDetailsRQ = () => {
  const { postId } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchById(postId),
  });

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="post-details-container">
      <div className="post-details-title">{data?.data?.title}</div>
      <div className="post-details-body">{data?.data?.body}</div>
    </div>
  );
};

export default PostDetailsRQ;
