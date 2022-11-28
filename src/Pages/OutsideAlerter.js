import React, { useRef, useEffect, useState } from "react";
import './LandingPage.css'
import logoLarge from './images/logoLarge.png'
import logo from './images/logo.png'
import { Button } from "@mui/material";
import UserPage from "./UserPage";
import StartPage from "./StartPage";
import { Outlet, Link } from "react-router-dom";
import VideoChat from "../VideoChat";


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(setClick) {
    
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
    //   if (ref.current && !ref.current.contains(event.target)) {
    //     alert("You clicked outside of me!");
    //   }
        setClick(true)
        
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter() {
 const [click, setClick] = useState(false)
//  const [user, setUser] = useState("")
  const wrapperRef = useRef(null);
  useOutsideAlerter(setClick);



  return  (
    <div >
    {!click ? (
        <div className="main">
        <h1>Hi! Welcome to</h1>
        <div >
            <img className="Main" src={logoLarge} alt="Logo" />
        </div>
        <h2> Click Anywhere To Start</h2>
        </div>
      )
      : (
        // <UserPage></UserPage>
        <VideoChat></VideoChat>
        // <div>
        //     <img className = "header" src={logo} alt="LogoMini" />
        //     <div className = "buttonsAlign">
        //         <Link to="/StartPage">
        //             <button className="chooseButton" onClick={()=>setUser("guest")}>
        //                 Join Meeting As Guest
        //             </button>
        //         </Link>

        //         <button className="chooseButton" onClick={()=>setUser("host")}>
        //             Join Meeting As Host
        //         </button>
        //     </div>   
        // </div>
        
      )}
      {/* {user !== "guest"  && user !== "host"? (
       ""
      )
      : (
        <StartPage user = {user}></StartPage>
      )} */}
    </div>
  )
  
    

        
  
 
}