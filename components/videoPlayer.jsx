"use client"
import { completeVideo, videoStartTime, videoStopTime } from '@/lib/apis';
import React, { useEffect , useRef} from 'react';

export default function VideoPlayer({otp, playbackInfo,setVideoObj, seekTime, id, setVideoTime, changeVideo}){


  useEffect(() => {
    // Initialize VdoPlayer when component mounts

    const initVideoPlayer = async() => {
      const player = new VdoPlayer({    
        otp : `${otp}`,
        playbackInfo: btoa(JSON.stringify({
          videoId: `${playbackInfo}`
        })),
        theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
        container: document.querySelector("#embedBox")  
      });
      player.addEventListener('load', () => {
        // player.availablePlaybackRates = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        player.seek(seekTime)
      });
      player.addEventListener('play',async function () {
        player.seek(seekTime)
        const {data} =  await videoStartTime(id,player.currentTime )
        return data
      });
      
      player.addEventListener('pause',async function () {
        player.seek(player.currentTime)
        const {data} =  await videoStopTime(id, player.currentTime)
        if(data){
        return  data
        }
      });
      player.addEventListener('progress', function () {
        setVideoTime(player.currentTime);
    
      });
    
      player.addEventListener('ended',async function () {
        const {data} =  await completeVideo(id,player.currentTime )
      if(data) return changeVideo(id, "next")
    
      });
    
      setVideoObj(player);
    };


    // Load VdoPlayer script
    const script = document.createElement('script');
    script.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
    script.onload = initVideoPlayer;
    document.body.appendChild(script);

    // Clean up function to remove script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [playbackInfo, otp]);


  return  <div id="embedBox" style={{  height: '100%', width: '90%', maxWidth: '90%' }}></div>
   
};

