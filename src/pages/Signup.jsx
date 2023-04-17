import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../config/BaseUrl";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const [err, setErorr] = useState();
  const navigate = useNavigate();
  const changeFunction = ({ currentTarget: input }) => {
    setUserDetails({
      ...userDetails,
      [input.name]: input.value,
    });
  };
  const signupFunction = async () => {
    try {
      let result = await instance.post("/user/addUser", userDetails);
      navigate("login");
    } catch (err) {
      setErorr("User signup failed");
    }
  };
  return (
    <>
      {err && <span style={{ color: "red" }}>{err}</span>}
      <h1>Signup</h1>
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
            <button onClick={signupFunction}>Submit</button>
          </td>
        </tr>
      </table>
    </>
  );
}

export default Signup;
