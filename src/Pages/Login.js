import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credentials.email,
        password: credentials.password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { success, authToken } = response.data;

      if (!success) {
        alert("Invalid Login Credentials");
      }

      if (success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", authToken);
        navigate("/");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
      <div style={{ border: "1px solid red", padding: "35px", borderRadius: "15px", width: "35vw" }}>
        <h1 className='mb-4'>Login</h1>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange} />
          </div>
          <button type="submit" className="mt-2 btn btn-danger">Login</button>
          <div className='mt-4'>
            <span>Don't have an account? <Link to='/signup'>Signup</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
