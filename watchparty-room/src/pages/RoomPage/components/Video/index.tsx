import React, { useRef, useState, useEffect } from 'react';
import './Video.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCog } from 'react-icons/fa';
import { io } from "socket.io-client";

const socket = io("/", {
  path: "/stream-service/socket.io",
  transports: ["websocket"],
  autoConnect: true,
});

const Video = ({ src, roomId }: { src: string; roomId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
      socket.emit("joinRoom", { roomId });

      socket.on("videoEvent", ({ type, currentTime }) => {
        const video = videoRef.current;
        if (!video) return;

        switch (type) {
          case "play":
            video.currentTime = currentTime;
            video.play();
            setIsPlaying(true);
            break;
          case "pause":
            video.pause();
            setIsPlaying(false);
            break;
          case "seek":
            video.currentTime = currentTime;
            break;
        }
      });

      return () => {
        socket.off("videoEvent");
      };
    }, [roomId]);


  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      socket.emit("videoEvent", { roomId, type: "play", currentTime: video.currentTime });
    } else {
      video.pause();
      setIsPlaying(false);
      socket.emit("videoEvent", { roomId, type: "pause", currentTime: video.currentTime });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (video.duration || 0);
    video.currentTime = seekTime;
    socket.emit("videoEvent", { roomId, type: "seek", currentTime: seekTime });
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
        if (!document.fullscreenElement) {
            videoRef.current.parentElement?.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
      }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
        if(isPlaying) {
            setShowControls(false);
        }
    }, 3000);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleProgress);
      videoElement.addEventListener('play', () => setIsPlaying(true));
      videoElement.addEventListener('pause', () => setIsPlaying(false));
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleProgress);
        videoElement.removeEventListener('play', () => setIsPlaying(true));
        videoElement.removeEventListener('pause', () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <div className="video-container" onMouseMove={handleMouseMove} onMouseLeave={() => isPlaying && setShowControls(false)}>
      <video
        ref={videoRef}
        className="video-player"
        src={src}
        onClick={handlePlayPause}
      />
      <div className={`video-controls ${showControls ? 'visible' : ''}`}>
        <div className="progress-bar-wrapper">
            <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="progress-bar"
            onChange={handleSeek}
            />
        </div>
        <div className="controls-row">
            <div className="controls-left">
                <button onClick={handlePlayPause} className="control-button">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="volume-control">
                    <button onClick={toggleMute} className="control-button">
                        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        className="volume-slider"
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
            <div className="controls-right">
                <button className="control-button">
                    <FaCog />
                </button>
                <button onClick={toggleFullScreen} className="control-button">
                    <FaExpand />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Video;