import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pic from "../assets/login.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formData = {
    username: email,
    password,
  };

  const Login = () => {
    if (!email || !password) {
      toast.error("please fill all the required details");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    fetch("http://localhost:8000/login", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          //   toast.error(res.statusText);
          throw new Error(`${res.status}, ${res.statusText}`);
        }
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("jwt", data.access_token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Successfully Logged In, " + data.user.name);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        <div className="login-image-container">
          <img src={Pic} alt="#" />
        </div>
        <div className="login-input-container">
          <h1>Hello, Friend!</h1>
          <p className="p">
            To keep connected with us please login with your personal info
          </p>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={Login}>Log in</button>
            <p>
              Don't have an account? &nbsp;
              <Link style={{ color: "#1ed4b8" }} to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
