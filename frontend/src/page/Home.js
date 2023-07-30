import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState();
  const User = sessionStorage.getItem("user");
  const navigate = useNavigate();

  const userId = JSON.parse(User).id;

  useEffect(() => {
    fetch("http://localhost:8000/getuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          window.alert("Please Login before to get authorised");
          navigate("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.error) {
          console.log(data.detail);
          window.alert("Please Login before to get authorised");
          navigate("/login");
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return data ? (
    <div>
      <div>{data.id}</div>
      <div>{data.name}</div>
      <div> {data.email}</div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Home;
