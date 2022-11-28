import React, { useState, useEffect, useRef } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";


const Participant = ({ participant, canvasBool, styles }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  // const inputVideoRef = useRef();
  const canvasRef = useRef();
  const contextRef = useRef();

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
  useEffect(() => {
    if (!canvasBool) {
      return
    }
    contextRef.current = canvasRef.current.getContext("2d");
    const constraints = {
      video: { width: { min: 20 }, height: { min: 20 } },
    };
    // console.log(videoRef)
    // console.log(videoRef.current)
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      // console.log("sdgjoi", stream)
      // console.log("sdgjoi", videoRef.current)
      // videoRef.current.srcObject = stream;
      sendToMediaPipe();
     });
     console.log(("hopsod["))
  
    // sendToMediaPipe();
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    selfieSegmentation.onResults(onResults);

    const sendToMediaPipe = async () => {
      if (videoRef && videoRef.current && !videoRef.current.videoWidth) {
        // console.log(videoRef.current.videoWidth);
        requestAnimationFrame(sendToMediaPipe);
      } else {
        await selfieSegmentation.send({ image: videoRef.current });
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, []);

  const onResults = (results) => {
    if (!canvasBool) {
      return
    }
    contextRef.current.save();
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Only overwrite existing pixels.
    // contextRef.current.globalCompositeOperation = "source-in";
    // contextRef.current.fillStyle = "#00FF00";
    // contextRef.current.fillRect(
    //   0,
    //   0,
    //   canvasRef.current.width,
    //   canvasRef.current.height
    // );
    

    // Only overwrite missing pixels.
    contextRef.current.globalCompositeOperation = "source-in";
    contextRef.current.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // flip hoirzontally?
    contextRef.current.translate(640, 0);
    contextRef.current.scale(-1, 1);

    contextRef.current.restore();
  };



  // STACK ABSOLUTELY

  // if canvas bool is true...we return no image just the cutout
  // if canvas bool is false...we don't even bother with any of the normal screen stuff
  return (

    canvasBool ? 
    <div className="participant">
      <h3>{participant.identity}</h3>
      <div id="overlayBOX">
        <video ref={videoRef} autoPlay={true} style={{filter:"opacity(0%)"}} />
        <audio ref={audioRef} autoPlay={true} muted={false} />
        <canvas style={{position:"absolute", top:"0", left:"0"}} ref={canvasRef} />
      </div>
    </div>
    :
    <div className="participant">
      <h3>{participant.identity}</h3>
      <div id="overlayBOX">
        <video style={styles} ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} muted={false} />
      </div>
    </div>
  );
};

export default Participant;
