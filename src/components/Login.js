import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    const responseGetUserName = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": json.authToken,
      }
    });
    const jsonGetUserName = await responseGetUserName.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('name', jsonGetUserName.name);
      props.newAlert("success", "Logged in Successfully");
      navigate("/");
    }
    else{
      props.newAlert("danger", "Invalid Credentials");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-5">
      <h2 className="my-3">Login to see your saved notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
          <div id="emailHelp" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" aria-describedby="passwordHelpBlock" value={credentials.password} onChange={onChange} required/>
          <div id="passwordHelpBlock" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>
            Must be 8-20 characters long
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={
          credentials.password.length < 8
        } ><i className="fa-solid fa-arrow-right-to-bracket me-2"></i>LogIn</button>
      </form>
    </div>
  )
}
