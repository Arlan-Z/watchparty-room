import { useEffect } from "react";
import { fetchVideoUrl, initSocket, subscribeToVideoEvents } from "../services/videoService";

export function useRoomSocket(roomId: string, videoRef: React.RefObject<HTMLVideoElement | null>, setVideoUrl: (url: string) => void, setIsPlaying: (value: boolean) => void) {
  useEffect(() => {
    const socket = initSocket();

    fetchVideoUrl(roomId)
      .then(setVideoUrl)
      .catch((err) => alert("⚠️ " + err.message));

    socket.emit("joinRoom", { roomId });

    socket.on("syncState", ({ videoUrl, currentTime, isPlaying }) => {
      const video = videoRef.current;
      if (!video) return;

      if (videoUrl) setVideoUrl(videoUrl);
      video.currentTime = currentTime || 0;

      if (isPlaying) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    });

    subscribeToVideoEvents(socket, videoRef, setIsPlaying);

    return () => {
      socket.off("syncState");
      socket.off("videoEvent");
    };
  }, [roomId, videoRef, setVideoUrl, setIsPlaying]);
}
