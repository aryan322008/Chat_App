import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import Avatar from "../components/avatarComponent/avatars"
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [avatarArray, setAvatarArray] = useState([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        if(!user){
            navigate("/login")
        }
    }, []);


    useEffect( () => {
        let arrayava = []
        for (let i = 0; i < 4; i++) {
        axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`).then((res)=>{
            const buffer = new Buffer(res.data)
            let bufferStr = buffer.toString("base64")
            arrayava.push(bufferStr)
            setAvatarArray(arrayava)
        }).catch((err)=>{
            console.log(err)
        })
        }
    }, []);

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

    const handleClick = (id) => {
        setSelectedAvatar(id)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const user = localStorage.getItem('user')

        if(user){
            if(selectedAvatar){
           const data = await axios.post(`http://localhost:5000/api/auth/setAvatar/${user}`,{
            image: avatarArray[selectedAvatar]
            })
            if(data){
                toast("Profile Successfully Setted Up",toastOpt);
                navigate("/")
            }}else{
                toast.error("select the image",toastOpt);
            }
        }else{
            navigate("/login")
        }

    
      }
    

    return (
        <>
            <div className="avatarContainer">
                <div className="avatarHeader">Select Avatar</div>
                <div className="avatarElementContainer">
                    {avatarArray.map((element, index) => {
                        return <Avatar 
                       element={element} key={index} id={index} func={handleClick}
                       selected = {selectedAvatar}   />
                    })}
                </div>
                   <form method="post" onSubmit={handleSubmit}>
                    <button type='submit'>Set As Profile Picture</button>
                   </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default UserAvatar;
