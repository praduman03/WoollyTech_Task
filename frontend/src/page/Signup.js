import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pic from "../assets/sapiens.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const CreateUser = () => {
    if (!name || !email || !password) {
      toast.error("please fill all the required details");
      return;
    }
    if (!emailREGEX.test(email)) {
      toast.error("invalid email");
      return;
    }
    if (!passwordREGEX.test(password)) {
      toast.error(
        "password should not be less than 6 characters and must contain atleast one number, one uppercase, one lowercase"
      );
      return;
    }
    fetch("http://localhost:8000/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          toast.error(data.alert);
        } else {
          toast.success("Create Account Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <ToastContainer />
      <div className="login-container">
        <div className="login-input-container">
          <h1>Create Account</h1>
          <p className="p">enter your personal details to create an account</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button onClick={CreateUser}>Sign up</button>
            <p>
              Already have an account? &nbsp;
              <Link style={{ color: "#1ed4b8" }} to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="login-image-container">
          <img className="signup-img" src={Pic} alt="#" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
