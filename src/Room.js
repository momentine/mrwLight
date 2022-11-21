import React, { useEffect, useState } from "react";
import Participant from "./Participant";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  console.log("AYOAYOAYO")
  console.log(participants)

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const windowBackF = participants.filter(p => p.identity === "windowFront")
  console.log(windowBackF)
  const windowBackFriends = windowBackF.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));
  console.log(participants)

  const windowFrontFriends = participants.filter(p => p.identity === "windowBack").map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  )); 




  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">

        {room ? (

          room.localParticipant.identity === "guest" ?
          <div className="remote-participants">{remoteParticipants}</div>
          : 
          // if windowback
          room.localParticipant.identity === "windowFront" ?
          <div className="wfFriends">{windowBackFriends}</div>
          : 
          // windowfront
          <div className="wfFriends">{windowFrontFriends}</div>
        ) : (
          ""
        )}
      </div>
      {/* <h3>Remote Participants</h3> */}
      {/* <div className="remote-participants">{remoteParticipants}</div> */}
    </div>
  );
};

export default Room;
