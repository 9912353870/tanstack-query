import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostRQ = () => {
  const [form, setFormData] = useState(null);
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

  const { mutate: addMutation } = useMutation({
    mutationFn: (payload) => {
        return axios.post("http://localhost:4000/posts", payload);
      } 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    addMutation(form);
  };

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading....!</div>;

  return (
    <div className="post-list" key="0">
      <div className="post-item">
        <form>
          <input
            type="text"
            name="title"
            onChange={(e) =>
              setFormData({ ...form, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            name="body"
            onChange={(e) =>
              setFormData({ ...form, [e.target.name]: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Add Post</button>
        </form>
      </div>
      {data &&
        data?.data?.map((item) => {
          return (
            <Link to={`/postsrq/${item.id}`}>
              <div className="post-item" key={item.id}>
                <h3 className="post-title">{item.title}</h3>
                <p className="post-body">{item.body}</p>
              </div>
            </Link>
          );
        })}
      <button onClick={refetch}>Fetch</button>
    </div>
  );
};

export default PostRQ;
