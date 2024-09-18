import axios from "axios";
import { useEffect, useState } from "react";

const PostTraditional = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/posts");
            setData(data);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (isError) return <div>Error in loading page..!</div>;
    if (isLoading) return <div>Loading....!</div>
    return <div>
        {
            data && data?.map((item) => {
                return (<div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>)
            })
        }
    </div>;
};

export default PostTraditional;
