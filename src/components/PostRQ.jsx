import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostRQ = () => {
  const [form, setFormData] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime: 30000 //To clear the stale at regular intervals of given time
    // refetchInterval: 1000, //Helps us to poll every second or desired time
    // refetchIntervalInBackground: true /*By setting this to true even when you're in sperate tab it won't stop fetching */,
    //enabled: false, //It won't allow automatic fetching, only allow manual fetching and provide 'refetch' fn to do it
  });

  const { mutate: addMutation } = useMutation({
    mutationFn: (payload) => {
      return axios.post("http://localhost:4000/posts", payload);
    },
    // onSuccess: (newData) => {
    //   //queryClient.invalidateQueries("posts");
    //   queryClient.setQueryData(["posts"], (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, newData.data],
    //     };
    //   });
    // },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const prevPostData = queryClient.getQueriesData(["posts"]);
      queryClient.setQueryData(["posts"], (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { ...newPost, id: "" + (oldData.length + 1) },
          ],
        };
      });

      return {
        prevPostData,
      };
    },
    onError: (_error, _posts, context) => {
            return context.prevPostData;
    },
    onSettled: () => {
        queryClient.invalidateQueries("posts");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation(form);
    setFormData({});
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
            value={form?.title || ""}
            onChange={(e) =>
              setFormData({ ...form, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            name="body"
            value={form?.body || ""}
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
