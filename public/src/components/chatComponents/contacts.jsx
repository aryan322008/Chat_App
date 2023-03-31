import React from 'react';
import AllContacts from "./allContacts"
import CurrentUser from "./currentUser"
import ChatHeader from "./chatHeader"

const Contacts = (props) => {

    return (
             <div className="contacts">
            <ChatHeader />
            <AllContacts 
             setSelectedUserForHeader={props.setSelectedUser} 
              SelectedUserforHeader = {props.SelectedUser}
              currentUserforschema = {props.currentUser}
              SetcurrentUserMsgs = {props.CurrentUserMsgs}
            />
            
            <CurrentUser   currentUser = {props.SetcurrentUser}/>
          </div>
    );
}

export default Contacts;
