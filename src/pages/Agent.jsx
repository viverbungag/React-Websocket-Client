import React from 'react'
import Reveal from 'reveal.js';
import { useEffect, useState, useReducer } from 'react';
import { over} from 'stompjs';
import SockJS from 'sockjs-client';
import { useUser } from '../contexts/UserContext';


let deck;
let stompClient = null

const reducer = (data, store) => {
  const newData = {...data}
  newData[store.type] = store.newValue
  return newData;
}


const Agent = () => {
  // const [name, setName] = useState("");

  const [data, dispatch] = useReducer(reducer,{});

  const onChangeInput = (newValue, type) => {
    dispatch({type, newValue});
    // setName(event.target.value);

    // if (stompClient){
    //   const message = event.target.value;
    //   stompClient.send("/app/message", {}, JSON.stringify(message));
    // }
  }

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    const { type, newValue } = payloadData
    // console.log(type);
    dispatch({type, newValue});
  }

  const onConnected = () =>{
    console.log("socket is now connected");
    stompClient.subscribe('/msg/input', onMessageReceived);
  }

  const onError = () => {
    console.log("socket is not connected");
  }


  useEffect(()=> {
    deck = new Reveal({
      backgroundTransition: 'slide',
      transition: 'slide',
    });
    deck.initialize();

    let sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError)
  });


  return (
    <div className="App">
    <div className="reveal presentation">
      <div className="slides" data-transition="slide">
        <section data-transition="slide">
          <h1>Agent Presentation</h1>
          <input disabled name="q1" value={data.q1 || ''} onChange={(e) => onChangeInput(e.target.value, e.target.name)}/>
          <input disabled name="q2" value={data.q2 || ''} onChange={(e) => onChangeInput(e.target.value, e.target.name)}/>
        </section>
        <section data-transition="slide">
          <h1>Slide 2</h1>
        </section>
      </div>
    </div>
    client
  </div>
  )
}

export default Agent