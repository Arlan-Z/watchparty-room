import React, { useState } from "react";
import "./Video.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCog } from "react-icons/fa";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { useRoomSocket } from "./hooks/useRoomSocket";
import { emitVideoEvent, initSocket } from "./services/videoService";

const Video = ({ roomId }: { roomId: string }) => {
  const {
    videoRef,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    progress,
  } = useVideoPlayer();

  const [videoUrl, setVideoUrl] = useState("");
  const socketRef = React.useRef(initSocket());
  const socket = socketRef.current;

  useRoomSocket(roomId, videoRef, setVideoUrl, setIsPlaying);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      emitVideoEvent(socket, roomId, "play", video.currentTime);
    } else {
      video.pause();
      setIsPlaying(false);
      emitVideoEvent(socket, roomId, "pause", video.currentTime);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (video.duration || 0);
    video.currentTime = seekTime;
    emitVideoEvent(socket, roomId, "seek", seekTime);
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement?.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    if (isPlaying) {
      controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const [showControls, setShowControls] = useState(true);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  return (
    <div
      className="video-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="video-player"
        src={videoUrl}
        onClick={handlePlayPause}
      />
      <div className={`video-controls ${showControls ? "visible" : ""}`}>
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
            <button className="control-button"><FaCog /></button>
            <button onClick={toggleFullScreen} className="control-button"><FaExpand /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
