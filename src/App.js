/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Button, Modal, Input } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import ImageUpload from "./imageUpload";

const BASE_URL = "https://image-drop.onrender.com/";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px 8px",
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setAuthToken(window.localStorage.getItem("authToken"));
    setAuthTokenType(window.localStorage.getItem("authTokenType"));
    setUserId(window.localStorage.getItem("userId"));
    setUsername(window.localStorage.getItem("username"));
  }, []);

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
        const result = data.sort((a, b) => {
          const t_a = a.timestamp.split(/[-T:]/);
          const t_b = b.timestamp.split(/[-T:]/);
          const d_a = new Date(
            Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
          );
          const d_b = new Date(
            Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
          );
          return d_b - d_a;
        });
        return result;
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const signIn = (event) => {
    event?.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(BASE_URL + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setAuthToken(data.access_token);
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUsername(data.username);
        window.localStorage.setItem("authToken", data.access_token);
        window.localStorage.setItem("authTokenType", data.token_type);
        window.localStorage.setItem("username", data.username);
        window.localStorage.setItem("userId", data.user_id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setOpenSignIn(false);
  };

  const signUp = (event) => {
    event?.preventDefault();
    // let formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);
    // formData.append("password", password);

    const json_string = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json_string,
    };

    fetch(BASE_URL + "users", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        signIn();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setOpenSignUp(false);
  };

  const signOut = (event) => {
    setAuthToken(null);
    setAuthTokenType(null);
    setUserId("");
    setUsername("");
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authTokenType");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userId");
  };

  return (
    <div className="app">
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.root}>
          <form className="app_signin">
            <center>
              <img
                className="app_headerImage"
                src="https://www.citypng.com/public/uploads/preview/-51609111065frgb7hekox.png"
                alt="ImageDrop"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Login
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <div style={modalStyle} className={classes.root}>
          <form className="app_signin">
            <center>
              <img
                className="app_headerImage"
                src="https://www.citypng.com/public/uploads/preview/-51609111065frgb7hekox.png"
                alt="ImageDrop"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.citypng.com/public/uploads/preview/-51609111065frgb7hekox.png"
          alt="ImageDrop"
        />
        {authToken ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpenSignUp(true)}>Signup</Button>
          </div>
        )}
      </div>
      <div className="app_posts">
        {posts.map((post) => (
          <Post
            post={post}
            authToken={authToken}
            authTokenType={authTokenType}
            username={username}
          />
        ))}
      </div>
      {authToken ? (
        <ImageUpload
          authToken={authToken}
          authTokenType={authTokenType}
          userId={userId}
        />
      ) : (
        <h3>You need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
