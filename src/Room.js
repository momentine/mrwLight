import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import useFullscreenStatus from "./useFullScreen.js"
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  // const windowFrontBG = useState([])
  // const windowFrontG = useState([])
  const handle = useFullScreenHandle();

  const [windowFrontBG, setWFBG] = useState([]);
  const [windowBackBG, setWBBG] = useState([]);
  const [windowFrontG, setWFG] = useState([]);

  // const [isFullscreen, setIsFullscreen] = useState([]);


  // function getBrowserFullscreenElementProp() {
  //   if (typeof document.fullscreenElement !== "undefined") {
  //     return "fullscreenElement";
  //   } else if (typeof document.mozFullScreenElement !== "undefined") {
  //     return "mozFullScreenElement";
  //   } else if (typeof document.msFullscreenElement !== "undefined") {
  //     return "msFullscreenElement";
  //   } else if (typeof document.webkitFullscreenElement !== "undefined") {
  //     return "webkitFullscreenElement";
  //   } else {
  //     throw new Error("fullscreenElement is not supported by this browser");
  //   }
  // }

  useEffect(() => {
    const participantConnected = (participant) => {
      // adds to remote
      setParticipants((prevParticipants) => [...prevParticipants, participant]);

      if (participant.identity === "windowBack") {
        setWFBG((prevParticipants) => [...prevParticipants, participant]);
      } else if (participant.identity === "guest") {
        setWFG((prevParticipants) => [...prevParticipants, participant]);
      } else {
        setWBBG((prevParticipants) => [...prevParticipants, participant]);
      }

    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
      setWFBG((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
      setWBBG((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
      setWFG((prevParticipants) =>
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

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} canvasBool={false}/> // this should be FALSE!
  ));

  // const windowBackF = participants.filter(p => p.identity === "windowFront")
  // let windowBackPpl = []
  // for (let i = 0; i < participants.length; i++) {
  //   console.log("asdasdasd", participants[i], participants[i].identity) 
  //   if (participants[i].identity === "windowFront") {
  //     windowBackPpl.push(
  //       <Participant key={participants[i].sid} participant={participants[i]} />
  //     )
  //   }
  // }

  
  const returnDisplay = (room) => {
    // logic can be greatly simplified by just returning remote guests if the overlay case is not true
    // however this allows a much greater amount of granularity

    if (room.localParticipant.identity === "windowFront") {
      if (windowFrontBG.length !== 0 && windowFrontG.length !== 0) {
        // return overlay
        const wb = windowFrontBG[0]
        const gst = windowFrontG[0]
        const styl = {position: "absolute", top:"0px", left:"0px"}

        return <>
          <Participant styles={styl} key={wb.sid} participant={wb} canvasBool={false}/>
          <Participant styles={styl} key={gst.sid} participant={gst} canvasBool={true}/>
        </>
        
      } else if (windowFrontBG.length === 0 && windowFrontG.length !== 0) {
        // return just guest
        const wfg = windowFrontG.map((participant) => (
          <Participant key={participant.sid} participant={participant} canvasBool={false}/>
        ));
        return <div className="remote-participants">{wfg}</div>
      } else{
        // return windowBack
        const wfg = windowFrontBG.map((participant) => (
          <Participant key={participant.sid} participant={participant} canvasBool={false}/>
        ));
        return <div className="remote-participants">{wfg}</div>
      }
    }

    if (room.localParticipant.identity === "windowBack") {
      if (windowBackBG.length !== 0 && windowFrontG.length !== 0) {
        // return overlay
        const wb = windowBackBG[0]
        const gst = windowFrontG[0]
        const styl = {position: "absolute", top:"0px", left:"0px"}
        return <>
          <Participant styles={styl} key={wb.sid} participant={wb} canvasBool={false}/>
          <Participant styles={styl} key={gst.sid} participant={gst} canvasBool={true}/>
        </>
        
      } else if (windowBackBG.length === 0 && windowFrontG.length !== 0) {
        // return just guest
        const wfg = windowFrontG.map((participant) => (
          <Participant key={participant.sid} participant={participant} canvasBool={false}/>
        ));
        return <div className="remote-participants">{wfg}</div>
      } else{
        // return windowFront
        const wfg = windowBackBG.map((participant) => (
          <Participant key={participant.sid} participant={participant} canvasBool={false}/>
        ));
        return <div className="remote-participants">{wfg}</div>
      }
    }

    //   return <div className="remote-participants">{remoteParticipants}</div>
    // } else if (room.localParticipant.identity === "guest") {
    //   return <div className="remote-participants">{remoteParticipants}</div>
    // }
    
    return <div className="remote-participants">{remoteParticipants}</div>
  }

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <div className="screenButtons">
        <button className="logout" onClick={handleLogout}>Log out</button>
        {/* <button className="fullButt" onClick={handle.enter} styles={{margin:"10px"}}>
          Fullscreen
        </button> */}
        <button className="fullButt" onClick={handle.enter}>
          Fullscreen
        </button>
      </div>
      <div className="local-participant">

        {room ? (
          (
            <FullScreen handle={handle}>
            {returnDisplay(room)}
            </FullScreen>
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
