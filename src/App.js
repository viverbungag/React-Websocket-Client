import './App.css';
import "/node_modules/reveal.js/dist/reveal.css";
import "/node_modules/reveal.js/dist/theme/black.css";
import Reveal from 'reveal.js';
import { useEffect, useState } from 'react';
import { over} from 'stompjs';
import SockJS from 'sockjs-client';

let deck;
let stompClient = null

function App() {
  const [name, setName] = useState("");


  const onChangeInput = (event) => {
    setName(event.target.value);

    if (stompClient){
      // const message = {
      //   message: event.target.value
      // }

      const message = event.target.value;
      stompClient.send("/app/message", {}, JSON.stringify(message));
    }
  }

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body)
    setName(payloadData);
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
            <h1>Welcome</h1>
            <input type="text" name="Name" placeholder='Name' value={name} onChange={onChangeInput}/>
          </section>
          <section data-transition="slide">
            <h1>Ma frend</h1>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
