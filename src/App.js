import './App.css';
import "/node_modules/reveal.js/dist/reveal.css";
import "/node_modules/reveal.js/dist/theme/black.css";
import Reveal from 'reveal.js';
import { useEffect, useState } from 'react';
import { over} from 'stompjs';
import SockJS from 'sockjs-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Agent from './pages/Agent';
import Client from './pages/Client';
import AgentLogin from './pages/AgentLogin';
import UserChoice from './pages/UserChoice';
import { UserProvider } from './contexts/UserContext';

let deck;
let stompClient = null

function App() {
  // const [name, setName] = useState("");


  // const onChangeInput = (event) => {
  //   setName(event.target.value);

  //   if (stompClient){
  //     // const message = {
  //     //   message: event.target.value
  //     // }

  //     const message = event.target.value;
  //     stompClient.send("/app/message", {}, JSON.stringify(message));
  //   }
  // }

  // const onMessageReceived = (payload) => {
  //   let payloadData = JSON.parse(payload.body)
  //   setName(payloadData);
  // }

  // const onConnected = () =>{
  //   console.log("socket is now connected");
  //   stompClient.subscribe('/msg/input', onMessageReceived);
  // }

  // const onError = () => {
  //   console.log("socket is not connected");
  // }


  // useEffect(()=> {
  //   deck = new Reveal({
  //     backgroundTransition: 'slide',
  //     transition: 'slide',
  //   });
  //   deck.initialize();

  //   let sock = new SockJS("http://localhost:8080/ws");
  //   stompClient = over(sock);
  //   stompClient.connect({}, onConnected, onError)
  // });


  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Routes>
          
            <Route path="/" element={<UserChoice />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/client" element={<Client />} />
          
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
