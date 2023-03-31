import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Contacts from "../components/chatComponents/contacts"
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { io } from "socket.io-client"

function Chat() {
  const [SelectedUserForHeader, setSelectedUserForHeader] = useState({ image: " ", username: " ", id: "" });
  const [currentUser, setcurrentUser] = useState({});
  const [msg, setMsg] = useState({ msgInput: "" });
  const [currentUserMsg, setCurrentUserMsg] = useState([]);
  const socket = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();
  const [typingState, setTypingState] = useState({});
  const [isTyping, setIstyping] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user')
    setcurrentUser(user)
    if (!user) {
      navigate("/login")
    }
    localStorage.removeItem('conversation')

  }, []);

  useEffect(() => {

    if (currentUser._id !== undefined) {
      console.log(currentUser._id)
    }
    const getUser = async () => {
      const user = localStorage.getItem('user')
      const { data } = await axios.get(`http://localhost:5000/api/auth/getCurrentUser/${user}`)
      socket.current = io("http://localhost:5000")
      socket.current.emit("addUser", data._id)
    }

    getUser()
  }, []);

  useEffect(() => {
    if (localStorage.getItem('selected') !== '') {
      // handleSubmit()
      localStorage.setItem("conversation", JSON.stringify(currentUserMsg))
    }
  }, [setCurrentUserMsg]);

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/login")

  }

  const handleChange = async (event) => {
    const { name, value } = event.target
    setMsg({ [name]: value })

    setIstyping(true)

    socket.current.emit("typing", { state: "Typing...", userId: localStorage.getItem("selected") })
  }

  useEffect(() => {
    console.log(isTyping)

    if(socket.current){
      socket.current.on("state-receive", (state) => {
        setTypingState({ ...state })
      })
    }
  }, [isTyping]);

  // useEffect(() => {
  //   console.log(typingState)
  // }, [typingState]);

  const handleSubmit = async () => {

    const { data } = await axios.post(
      `http://localhost:5000/api/store/sendMessage`,
      {
        receiver: localStorage.getItem("selected"),
        sender: currentUser._id,
        message: msg.msgInput
      }
    )
    socket.current.emit("sendMsg", {
      receiver: localStorage.getItem("selected"),
      sender: currentUser._id,
      message: msg.msgInput
    })

    localStorage.setItem("conversation", JSON.stringify(data.conversation))

    const msgs = [...data.conversation]

    msgs.push({
      receiver: localStorage.getItem("selected"),
      user: currentUser._id,
      msg: msg.msgInput
    })

    setCurrentUserMsg(msgs)

    setMsg({ msgInput: "" })
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {

        setArrivalMessage({ ...message })
      })
    } else {
      console.log('it is undefined')
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {
        setArrivalMessage({ ...message })
      })
    } else {
      console.log(socket.current)
    }
  }, [SelectedUserForHeader]);

  useEffect(() => {
    // console.log(arrivalMessage)
    arrivalMessage && setCurrentUserMsg((prev) => {
      return [...prev, arrivalMessage]
    })
  }, [arrivalMessage]);

  return (
    <>
      <div className="chatContainer">

        <div className="chatAppInterface">
          {/* for contacts */}
          <Contacts
            setSelectedUser={setSelectedUserForHeader}
            SelectedUser={SelectedUserForHeader}
            SetcurrentUser={setcurrentUser}
            currentUser={currentUser}
            CurrentUserMsgs={setCurrentUserMsg}
          />

          {/* for textInput */}
          <div className="inputContainer">
            <div className="inputHeader">
              <div className="mainContainer">
                <div className="profile">
                  {SelectedUserForHeader.image !== " " ?
                    <img src={`data:image/svg+xml;base64,${SelectedUserForHeader.image}`} style={{ width: "3rem", height: "3rem" }} ></img> : ""}
                </div>
                <h2 className='SelectedUserForHeader'>{SelectedUserForHeader.username}</h2>
                <div className="typingState">{typingState.state}</div>
              </div>

              <button onClick={(event) => { logout() }} className="logout"><LogoutIcon /></button>
            </div>
            <div className="msgContainer">
              {currentUserMsg.map((element, index) => {
                return (<span
                  key={index}
                  className={`msg ${element.user === currentUser._id ? "right" : "left"}`}
                  style={{ top: `${index * 15}vh` }}
                >
                  {element.msg}</span>
                )
              })}
            </div>

            <div className="inputPanel">

              <div className="emojiPicker"></div>

              <form onSubmit={(event) => { event.preventDefault() }} className="msgForm">
                <input type="text" name="msgInput" onChange={(event) => { handleChange(event) }} value={msg.msgInput} />

                <button type="submit" onClick={(event) => { handleSubmit() }} className="sendMessageBtn">
                  <SendIcon />
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Chat 