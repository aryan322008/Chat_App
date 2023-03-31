import React,{useState} from 'react';

const Avatars = (props) => {
    return (
        <div 
        id={props.id} 
        className={`avatar ${props.selected===props.id?"selected":""}`} 
        onClick={ e => props.func(props.id) }>
       <img src={`data:image/svg+xml;base64,${props.element}`} alt="avatar" />
        </div>
    );
}

export default Avatars;
