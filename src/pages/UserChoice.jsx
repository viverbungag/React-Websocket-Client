import React from "react"
import { useUserUpdate } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserChoice = () => {
  const userOnChange = useUserUpdate();
  const navigate = useNavigate();


  const agentButtonOnClick = () => {
    userOnChange("", "agent");
    navigate("../agent-login");
  }

  const clientButtonOnClick = () => {
    userOnChange("", "client");
    navigate("../client");
  }

  return (
    <div>
      <button onClick={agentButtonOnClick}>agent</button>
      <button onClick={clientButtonOnClick}>client</button>
    </div>
  )
}

export default UserChoice