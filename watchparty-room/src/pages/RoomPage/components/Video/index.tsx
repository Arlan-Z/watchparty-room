import React, { useRef, useState, useEffect } from 'react';
import './Video.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCog } from 'react-icons/fa';

const Video = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
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
    const seekTime = (parseFloat(e.target.value) / 100) * (videoRef.current?.duration || 0);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
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