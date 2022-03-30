import React from 'react';
import './dogs.css'

const DogImage = (props) => {

    return (
        <div>
            <img src={props.src}  alt=""/>
        </div>
    )
}
export default DogImage