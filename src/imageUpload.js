import { useState } from "react";
import { Button } from "@mui/material";
import "./imageUpload.css";

const BASE_URL = "https://image-drop.onrender.com/";

function ImageUpload({ authToken, authTokenType }) {
  const [captions, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.file[0]) {
      setImage(e.targe.file[0]);
    }
  };

  const handleUpload = (e) => {
    e?.preventDefault();
    let formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + "" + authToken,
      }),
      body: formData,
    };
    fetch(BASE_URL + "posts/image", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setImage(null);
        // create post here
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCaption("");
        setImage(null);
        document.getElementById("fileinput").value = null;
      });
  };
  return (
    <div className="imageupload">
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={captions}
      />
      <input type="file" id="fileInput" onChange={handleChange} />
      <Button className="imageupload_button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
