import React, { useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Register() {
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
    const bool = handleValidation()
    if (bool) {
      const { username, email, password } = value

      axios.post('http://localhost:5000/api/auth/register', {
        username, email, password
      }).then((res) => {
        localStorage.setItem("user", res.data)
        toast("Successfully signed IN",toastOpt);
        navigate("/setAvatar")
      }).catch((err) => {
        toast.error(err.response.data,toastOpt);
      })

    } else {
      toast.error("user not registered",toastOpt);
    }
  }

  const handleChange = (event) => {
    const { name } = event.target
    setValue({ ...value, [name]: event.target.value })
  }

  const handleValidation = () => {
    const { username, password, confirmPassword } = value

    if (username.length < 6) {
      toast.error("username too short",toastOpt);
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Cofirm-password doesn't match ",toastOpt);
      return false
    }
    return true
  }



  return (
    <>
      <div className="formcontainer">

        <div className="elementContainer">

          <div className="header">
            <img src="" alt="" />
            <h1>Snappy</h1>
            <h2>Register</h2>
          </div>

          <form className='inputForm' onSubmit={(event) => handleSubmit(event)}>

            <input
              type="text" name="username" placeholder='username'
              onChange={(event) => { handleChange(event) }}
            />

            <input
              type="email" name="email" placeholder='email'
              onChange={(event) => { handleChange(event) }}
            />

            <input
              type="password" name="password" placeholder='password'
              onChange={(event) => { handleChange(event) }}
            />

            <input
              type="Password" name="confirmPassword" placeholder='Confirm Password'
              onChange={(event) => { handleChange(event) }}
            />

            <button type="submit">Submit</button>
          </form>

          <span style={{"fontSize": "0.9rem"}}>Already have an account <Link to="/login">Login</Link> </span>

        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Register