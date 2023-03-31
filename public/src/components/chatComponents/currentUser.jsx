import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CurrentUser = (props) => {
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate("/login")
        }
    }, []);

    useEffect(() => {
           getCurrentUser()
    }, []);


   const getCurrentUser = async () =>{
    const user = localStorage.getItem('user')

    if(user){
        const {data} = await axios.get(`http://localhost:5000/api/auth/getCurrentUser/${user}`)
        
        setCurrentUser(data)
        props.currentUser(data)
            
    }else{
        console.log("user doesn't exists")
    }

   }

    return (
        <div className="currentUser">
            <div className="profile"><img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" /></div>
            <div className="username">{currentUser.username}</div>
        </div>
    );
}

export default CurrentUser;
