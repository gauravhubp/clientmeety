import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import GroupsIcon from '@mui/icons-material/Groups';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import logo from './images/meet.png';
import p1 from './images/p1.jpg';
import p2 from './images/p2.png';
import p3 from './images/p3.png';
import m1 from './images/m1.png';
import m2 from './images/m2.png';
import video from './images/v.mp4';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import TvIcon from '@mui/icons-material/Tv';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import "./styles.css"
import {BrowserRouter} from 'react-router-dom';
import { SocketProvider } from "../context/SocketProvider";
import App from "../App";
function clickLobby()
{
  const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SocketProvider>
    <App/>
    </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
  
}

function Home() {
  
    return (
      <div className="Home-app">
        
        <div>
        <header className="Home">
        <h1 class="head"><GroupsIcon /> Meety
        <span class="name">@Gaurav</span>
        </h1>
      
        </header> 
  
        </div>
        
        
        <div class="row">
           <div class="row1 col-lg-6 col-md-12">
              <h2 class="rh">Fast,reliable and secure Video Calling.</h2>
              <p class="row1note" >Hold incredible events,share knowledge,build and grow your community,create opportunity.</p>
                 <button class="button button5" onClick={clickLobby}><OndemandVideoIcon/> Enter The Lobby</button>
            
           </div>
           <div class="row2 col-lg-6 col-md-12">
           <img class="logo" src={logo} alt="react logo" />
           </div>
        </div>
         
         

        <div class="row">
        <div class="row21 col-lg-6 col-md-12">
            <p class="row2note">Meety Online specialises in Event Technology and services such as Event Management, Virtual Event Management, Event Print and Design, Namebadges, etc. We put a strong focus on the needs of your event to provide solutions</p>
            <img class="m1" src={m1} alt="img" /> 
           </div>
           <div class="row22 col-lg-6 col-md-12">
              <h5 class="rs">Ready to setup your next meet</h5>
              <img class="m2" src={m2} alt="img" /> 
           </div>
        </div>


        <div class="js-pill" id="pills-tab" role="tablist">


    <button class="nav-link-js btn btn-outline-purple active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Events</button>

    <button class="nav-link-js btn btn-outline-purple" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Spaces</button>


    <button class="nav-link-js btn btn-outline-purple" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Developers</button>

</div>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
    <p class="para-tab"><EmojiEventsIcon /> Online webinars</p>
    <p class="para-tab"><SmartDisplayIcon /> Community Events</p>
    <img class="p" src={p1} alt="img" />
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
  <p class="para-tab"><TvIcon/> Connected Rooms</p>
    <p class="para-tab"><WorkspacesIcon /> Workspaces</p>
    <img class="p" src={p2} alt="img" />
  </div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0"> 
    <p class="para-tab"><AppSettingsAltIcon /> Market Place</p>
    <p class="para-tab"><StorefrontIcon /> Apps</p>
    <img class="p" src={p3} alt="img" />
    </div>
 </div>


 <div class="row31">
        <video class="video" autoplay="true" controls="controls" src={video} /> 
         </div>
   


         {/* Second last div */}
       
         <div class="slide-up talk">
            <h2 class="talkhead">Powerfull Virtual Meeting Platform</h2>
            <p class="talkpara">We approach online conference,virtual and hybrid events differently.</p>
          </div>

          
<footer id="footer">
  <div class="foot">
    <div class="container-fluid">
    <i class="social-icon fab fa-facebook-f"></i>
    <i class="social-icon fab fa-twitter"></i>
    <i class="social-icon fab fa-instagram"></i>
  </div>
    <p class="footpara">© Copyright Meety</p>
  </div>
  </footer>
        
      </div>
    );
  }
  
  export default Home;
  