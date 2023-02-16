import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser, useUserUpdate } from '../contexts/UserContext';

const AgentLogin = () => {
  const { username } = useUser(); 
  const navigate = useNavigate();
  const userOnChange = useUserUpdate();

  const userNameOnChange = (event) => {
    userOnChange(event.target.value, "agent");
  }

  const loginButtonOnClick = () => {
    navigate("../agent");
  }

  return (
    <div>
      <h1>AgentLogin</h1>
        <input type="text" value={username} onChange={userNameOnChange}/>
      <button onClick={loginButtonOnClick} >login</button>
    </div>
  )
}

export default AgentLogin