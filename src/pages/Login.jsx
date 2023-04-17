import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../config/BaseUrl";

function Login() {
  const [err, setErorr] = useState();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const changeFunction = ({ currentTarget: input }) => {
    setUserDetails({
      ...userDetails,
      [input.name]: input.value,
    });
  };
  const loginFunction = async () => {
    try {
      let result = await instance.post("/user/signin", userDetails);
      localStorage.setItem("userToken", result.data.token);
      navigate("/addProduct");
    } catch (err) {
      setErorr("Username or password incorrect");
    }
  };
  return (
    <>
      {err && <span style={{ color: "red" }}>{err}</span>}
      <h1>Login</h1>
      <table>
        <tr>
          <td>Username</td>
          <td>
            <input
              type="text"
              name="userName"
              onChange={changeFunction}
              value={userDetails.userName}
            />
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            <input
              type="password"
              name="password"
              onChange={changeFunction}
              value={userDetails.password}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button onClick={loginFunction}>Submit</button>
          </td>
        </tr>
      </table>
    </>
  );
}

export default Login;
