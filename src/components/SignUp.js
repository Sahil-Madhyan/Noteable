import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SignUp form submitted");
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.newAlert("success", "Account Created Successfully");
        }
        else {
            props.newAlert("danger", "Email already exists");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-5">
            <h2 className="my-3">Sign Up to save your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" aria-describedby="nameHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" aria-describedby="passwordHelpBlock" onChange={onChange} minLength={8} required/>
                    <div id="passwordHelpBlock" className={`form-text text-${props.mode==='light' ? 'muted' : 'white'}`}>
                        Must be 8-20 characters long
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" aria-describedby="cpasswordHelpBlock" onChange={onChange} minLength={8} required/>
                    <div id="cpasswordHelpBlock" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>
                        Must be 8-20 characters long
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"><i className="fa-solid fa-user-plus me-2"></i>Sign Up</button>
            </form>
        </div>
    )
}
