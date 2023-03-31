import React from 'react';

const Singlecontact = (props) => {
    return (
          <div
          className={`contact ${props.selected===props.id?"selectedContact":""}`} 
          id={props.id} 
          onClick={e =>props.func(props.id, props.username, props.image)} 
          >
                <div className="profile">
                    <img src={`data:image/svg+xml;base64,${props.image}`} alt="avatar" />
                </div>
                <div className="username">{props.username}</div>
            </div>
    );
}

export default Singlecontact;
