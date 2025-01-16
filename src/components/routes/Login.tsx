import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { AxiosContext } from "../AxiosContext";
import { useLocation, useNavigate } from "react-router-dom";
import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string|null>(null); // New state for handling error messages
  const { user, login } = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const navigate = useNavigate();

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get('from') || '/'

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Lock form
    setActive(false);
    try {
      const response = await publicAxios.post('/auth/clerk/login', {
        name: username,
        password
      });
      login(response.data);
      navigate(from);
    } catch (error: any) {
      console.error("Authentication failed:", error);
      setErrorMessage('Failed to log in. Try again later');
      // Unlock form
      setActive(true);
      // if (error.response && error.response.data) {
      //   setErrorMessage(error.response.data); // Set the error message if present in the error response
      // } else {
      //   setErrorMessage("An unexpected error occurred. Please try again.");
      // }
    }
  };

  return (
    <div className="login-page">
      <div className="login-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button disabled={!active} type="submit">Login</button>
        </form>
        {errorMessage && <div className="login-error" style={{ color: "red" }}>{errorMessage}</div>}{" "}
      </div>
      
    </div>
  );
};