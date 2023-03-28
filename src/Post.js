/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./Post.css";

const BASE_URL = "https://image-drop.onrender.com/";

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (post.image_url_type === "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(BASE_URL + post.image_url);
    }
  }, []);

  return (
    <div className="post">
      <img className="post_image" src={imageUrl} />
    </div>
  );
}

export default Post;
