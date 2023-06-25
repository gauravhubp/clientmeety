import React, { useCallback, useEffect,useState } from "react";
import {useSocket} from "../context/SocketProvider";
import ReactPlayer from 'react-player';
import peer from "../service/peer";
import {useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style2.css"
import al from './alone.png';
import Home from "../Homepage/Home";
import ReactDOM from 'react-dom/client';
import c from './call.jpg';

function handlebt()
{
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Home/>
);
window.location.reload();
}


const RoomPage = ()=>{
    const socket = useSocket();
    const [remoteSocketId,setRemoteSocketId] =useState(null)
    const [myStream,setMyStream]=useState();
    const [remoteStream,setRemoteStream]=useState();
    let btnRef = useRef();
    let btnr = useRef();

    const handleUserJoined = useCallback(({email,id})=>{
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    },[])

    const handleCalluser = useCallback(async()=>{
        const stream =await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        if(btnr.current){
            btnr.current.setAttribute("disabled", "disabled");
          }
        const offer=await peer.getoffer();
        socket.emit("user:call",{to: remoteSocketId,offer});
        setMyStream(stream)
    },[remoteSocketId,socket]);


    const handleIncomingCall = useCallback(async ({from,offer}) =>{
        setRemoteSocketId(from);
        const stream =await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        setMyStream(stream)
        console.log('Incoming Call',from,offer)
        const ans=await peer.getAnswer(offer);
        socket.emit("call:accepted",{to: from,ans})
    },[socket]);

     let [x,setx] =useState(true);
    const SendStreams =useCallback(() =>{
        for (const track of myStream.getTracks())
       {
        peer.peer.addTrack(track,myStream);
        if(btnr.current){
            btnr.current.setAttribute("disabled", "disabled");
          }
          setx(false)
       }
       toast("Connected");
    },[myStream]);
     
     
     const handleCallAccepted=useCallback(({from,ans}) => {
       peer.setLocalDescription(ans);
       console.log("call accepted!");
       SendStreams();
     },[SendStreams]);

     
     const handleNegoNeeded = useCallback(async() => {
        const offer =await peer.getoffer();
        socket.emit("peer:nego:needed",{offer,to:remoteSocketId});
     },[remoteSocketId,socket]);

     const handleNegoNeededFinal = useCallback(async ({ans})=>{
        await peer.setLocalDescription(ans);
     },[])

     const handleNegoNeededIncoming = useCallback(async ({from,offer})=>{
        const ans=await peer.getAnswer(offer);
        socket.emit("peer:nego:done",{to: from,ans});
    },[socket]);

     useEffect(() => {
        peer.peer.addEventListener("negotiationneeded",handleNegoNeeded);
        return () => 
          {
            peer.peer.removeEventListener("negotiationneeded",handleNegoNeeded);
          };
     },[handleNegoNeeded]) 

     useEffect(()=>{
        peer.peer.addEventListener("track",async (ev) =>{
            const remoteStream = ev.streams;
            console.log('Got Tracks');
            setRemoteStream(remoteStream[0])
        });
     },[]);
     

    useEffect(()=>{
        socket.on('user:joined',handleUserJoined);
        socket.on('incoming:call',handleIncomingCall);
        socket.on('call:accepted',handleCallAccepted);
        socket.on('peer:nego:needed',handleNegoNeededIncoming);
        socket.on('peer:nego:final',handleNegoNeededFinal);

        return () =>{
            socket.off('user:joined',handleUserJoined)
            socket.off('incoming:call',handleIncomingCall)
            socket.off('call:accepted',handleCallAccepted);
            socket.off('peer:nego:needed',handleNegoNeededIncoming);
            socket.off('peer:nego:final',handleNegoNeededFinal);
        }
    },[socket,handleUserJoined,handleIncomingCall,handleCallAccepted,handleNegoNeededIncoming,handleNegoNeededFinal]);
    
    return (
        <div class="Room">
            <div class="room-c"><h1 class="hm-room">Room</h1></div>
                {x && myStream && <div class="center-bt"><button ref={btnr} class="h-bt" onClick={SendStreams}>Connect</button></div>}
                {remoteSocketId && !myStream && 
                <div class="center-bt">
                    <img class="call" src={c} alt="call-img" />
                    <button ref={btnRef} class="h-bt" onClick={handleCalluser}>
                    CALL
                    </button>
                    </div>}
                <div class="row">
                  <div class="col-lg-6">
                  {myStream && (<>
                     <ReactPlayer class="my" playing height="320px" width="520px" url={myStream} /> 
                     <h1 class="h1-room mcol">My Stream</h1>
                     </>)}
                    </div>  
                    <div class="col-lg-6 rcol">
                    {remoteStream && (<>
            <ReactPlayer class="user" playing height="320px" width="520px" url={remoteStream} /> 
            <h1 class="h1-room">User</h1>
            </>)}
                    </div>
                </div>
            <h4 class="h4-room">{x&&remoteSocketId? 'Knock Knock! Someone is here': null}</h4>
            <h4 class="h4-room">{!remoteSocketId?  'No one is here right now' : null}</h4>
            {!remoteSocketId ? <div class="alone-img"><img class="alone" src={al} alt="alone" /></div>: null}
            {!x ? 
      <div class="center-bt"><button class="h-bt" onClick={handlebt}>Leave the Room</button></div>: null}
            <ToastContainer autoClose={800}/>
        </div>
    )
}

export default RoomPage;