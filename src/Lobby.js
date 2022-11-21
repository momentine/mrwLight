import React from "react";
import Button from '@mui/material/Button';


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
      
      <h2>Enter a room</h2>

      <Button style={{margin: "auto"}} onClick={() => handleUsernameChange('guest')}>Guest</Button>
        <Button style={{margin: "auto"}} onClick={() => handleUsernameChange('windowFront')}>windowFront</Button>
        <Button  style={{margin: "auto"}}onClick={() => handleUsernameChange('windowBack')}>windowBack</Button>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          readOnly={true}
          required
        />
      </div>

      <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button>
    </form>
    </>
  );
};

export default Lobby;
