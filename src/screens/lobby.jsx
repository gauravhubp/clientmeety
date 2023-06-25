import React, { useCallback, useState,useEffect } from "react";
import ReactDOM from 'react-dom/client';
import {useSocket} from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import "./style.css"
import Home from "../Homepage/Home";
function handlebt()
{
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Home/>
);
}

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

const socket =useSocket();
const navigate=useNavigate();

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join',{email,room});
  }, [email, room,socket]);

  const handleJoinRoom =useCallback((data) =>{
    const { email,room }=data;
    navigate(`/room/${room}`);
  },[navigate])


  useEffect(()=>{
    socket.on("room:join",handleJoinRoom);
     return ()=>{
      socket.off('room:join',handleJoinRoom);
     }
    },[socket,handleJoinRoom]);

  return (
    <div class="area">
      <div class="container">
      <div class="wrapper">
      <h1 class="h1n">Lobby</h1>
      <form class="form" onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <br />
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button id="login-button">Join</button>
        <br />
      <button class="h-b" onClick={handlebt}>Home</button>
      </form>
      </div>
      <ul class="circles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
    <li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
  </div>
  </div>
  );
};

export default LobbyScreen;
