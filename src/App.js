/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";

const BASE_URL = "https://image-drop.onrender.com/";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "posts/all")
      .then((response) => {
        const json = response.json();
        console.log(json);
        if (response.ok) {
          return json;
        }
        throw response;
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app_posts">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default App;
