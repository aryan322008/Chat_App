import React, { useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const toastOpt = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const { username, email, password } = value

    axios.post('http://localhost:5000/api/auth/login', {
      username, email, password
    }).then((res) => {
      localStorage.setItem("user", res.data.token)
      toast("Successfully Logged IN",toastOpt);

      

      if(!res.data.isImageAvatarSet){
        navigate("/setAvatar")
      }else{
        navigate("/")
      }

    }).catch((err) => {
      toast.error(err.response.data,toastOpt);
    })

  }

  const handleChange = (event) => {
    const { name } = event.target
    setValue({ ...value, [name]: event.target.value })
  }

  return (
    <>
      <div className="formcontainer">
        <div className="elementContainer">
          <div className="header">
            <img src="" alt="" />
            <h1>Snappy</h1>
          <h2>Login</h2>
          </div>
          <form className='inputForm' onSubmit={(event) => handleSubmit(event)}>

            <input
              type="email" name="email" placeholder='email'
              onChange={(event) => { handleChange(event) }}
            />

            <input
              type="password" name="password" placeholder='password'
              onChange={(event) => { handleChange(event) }}
            />

            <button type="submit">Submit</button>
          </form>
          
          <span style={{"fontSize": "0.9rem"}}> Don't have an account <Link to="/register">Register</Link> </span>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Login