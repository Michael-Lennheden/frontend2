import React from 'react';
import DogImage from './components/dogs/dogs';
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [dogUrlArray, setDogUrlArray] = useState([]);
  const [dogUrl, setDogUrl] = useState('');

  const handleClick = async () => {

    const response = await fetch('https://random.dog/woof.json');
    const body = await response.json();

    setDogUrl(body.url)
  };

  useEffect(() => {

    if (dogUrl.length <= 0) {
      return;
    }

    const key = Math.floor((Math.random() + 1) * 1000000);
    const urlObj = {
      key: key,
      url: dogUrl
    };

    localStorage.setItem(key.toString(), JSON.stringify(urlObj));
    setDogUrlArray([...dogUrlArray, JSON.stringify(urlObj)])
  }, [dogUrl]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      temp.push(localStorage.getItem(localStorage.key(i)));
    }
    setDogUrlArray(temp);

    handleClick();
  }, []);
  
  return (
    <div className="App">
      <DogImage src={dogUrl}/>
      <button className="Button1" onClick={() => handleClick()}>Show a new dog!</button>
      <ul>
        {
          dogUrlArray.map((imageUrl, index) => {
            const imageObj = JSON.parse(imageUrl);
            return (
              <li key={index} onClick={() => {
                localStorage.removeItem(imageObj.key);
                setDogUrlArray([
                  ...dogUrlArray.slice(0, index),
                  ...dogUrlArray.slice(index + 1, dogUrlArray.length)
                ]);
              }}>{imageObj.url}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
