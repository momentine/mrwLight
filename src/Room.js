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

  // const windowBackF = participants.filter(p => p.identity === "windowFront")
  let windowBackPpl = []

  for (let i = 0; i < participants.length; i++) {
    console.log("asdasdasd", participants[i], participants[i].identity) 
    if (participants[i].identity === "windowFront") {
      windowBackPpl.push(
        <Participant key={participants[i].sid} participant={participants[i]} />
      )
    }
  }

  
  const returnDisplay = (room) => {
    console.log("ASIYSDGIUSD")
    if (room.localParticipant.identity === "windowFront") {
      return <div className="remote-participants">{remoteParticipants}</div>
    } else if (room.localParticipant.identity === "guest") {
      return <div className="remote-participants">{remoteParticipants}</div>
    }
    return <div className="remote-participants">{remoteParticipants}</div>
  }

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">

        {room ? (
          (
            returnDisplay(room)
          )
        )
        : (
          ""
        )}
      </div>
      {/* <h3>Remote Participants</h3> */}
      {/* <div className="remote-participants">{remoteParticipants}</div> */}
    </div>
  );
};

export default Room;
