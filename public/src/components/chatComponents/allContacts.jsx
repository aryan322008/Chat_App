import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContact from "./Singlecontact"

const AllContacts = (props) => {
    const [allContacts, setAllContacts] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        if(props.SelectedUserforHeader.id!==''){
            setSelectedUser(props.SelectedUserforHeader.id)
            console.log("useEffect 2")
        }

        const selectedUserStore = localStorage.setItem('selected',"")
    }, [setSelectedUser]);

    const getUsers = async () => {
        const user = localStorage.getItem('user')
        const { data } = await axios.get(`http://localhost:5000/api/auth/fetchusers/${user}`)
        setAllContacts(data)
        return data
    }


    const handleClick = async (id, username, image) => {
        localStorage.setItem('selected',id)
        setSelectedUser(id)
        await props.setSelectedUserForHeader({ username, image, id })
        const currentUser = await props.currentUserforschema
        const selected = selectedUser       
      
        
        if( localStorage.getItem('selected') === ''){
            console.log("null")
        }else{
            const selectedUserStore = localStorage.getItem('selected')

            const { data } = await axios.post(
                `http://localhost:5000/api/store/createCollection`,
                {
                   currentUser : currentUser._id,
                   selected :selectedUserStore
                }
            )
            props.SetcurrentUserMsgs(data.convFind[0].conversation)
            localStorage.setItem("conversation",JSON.stringify(data.convFind[0].conversation))      
          }

    }

    return (
        <div className="allContacts">
            {allContacts.map((element, index) => {
                return (<SingleContact
                    key={index}
                    id={element._id}
                    image={element.avatarImage}
                    username={element.username}
                    func={handleClick}
                    selected={selectedUser}
                />)
            })}
        </div>
    );
}

export default AllContacts;
