import React from "react";
import Button from '@mui/material/Button';
import front from './Pages/images/frontW.png'
import back from './Pages/images/backW.png'
import logo from './Pages/images/logo.png'
import './Lobby.css';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
    <img className = "header" src={logo} alt="LogoMini" />
            
      
      <h2>Pick User:</h2>

      {/* <Button style={{margin: "auto"}} onClick={() => handleUsernameChange('guest')}>Guest</Button>
      <Button style={{margin: "auto"}} onClick={() => handleUsernameChange('windowFront')}>windowFront</Button>
      <Button  style={{margin: "auto"}}onClick={() => handleUsernameChange('windowBack')}>windowBack</Button> */}
            <div className = "buttonsAlign">
                <div>
                {/* <img className = "header" src={logo} alt="LogoMini" />
                <h1>Which Screen?</h1> */}
                {/* <h2>Is host?</h2> */}
                <div className="row">
                  <div className="col">
                    <button type="submit" className="hostButton"><img src={front} className="window" onClick={()=>handleUsernameChange('windowFront')}/></button>
                  </div>
                  <div className="col">
                    <button type="submit" className="hostButton"><img src={back} className="window" onClick={()=>handleUsernameChange('windowBack')}/></button>
            
                  </div>
                </div>
                {/* <h2>Is guest?</h2> */}
                <button type="submit" className="chooseButton" onClick={()=>handleUsernameChange('guest')}>
                    Join Meeting As Guest
                </button>

               </div>

                {/* <button className="chooseButton" onClick={()=>handleUsernameChange('windowFront')}>
                    Join Meeting As Host
                </button> */}
            </div>   

      {/* <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          readOnly={connecting}
          required
        />
      </div> */}
      <h2>{connecting ? "Connecting" : ""}</h2>
      {/* <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button> */}
    </form>
    </>
  );
};

export default Lobby;
