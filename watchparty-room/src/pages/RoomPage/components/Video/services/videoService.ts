import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io("/", {
      path: "/stream-service/socket.io",
      transports: ["websocket"],
      autoConnect: true,
    });
  }
  return socket;
};

export const fetchVideoUrl = async (roomId: string): Promise<string> => {
  const res = await fetch(`/stream-service/api/rooms/${roomId}`);
  if (!res.ok) throw new Error("Room not found");

  const data = await res.json();
  if (!data?.videoUrl) throw new Error("Video not found for this room");

  return data.videoUrl;
};

export const subscribeToVideoEvents = (
  socket: Socket,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setIsPlaying: (val: boolean) => void
) => {
  socket.on("videoEvent", ({ type, currentTime }) => {
    const video = videoRef?.current;
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
};

export const emitVideoEvent = (
  socket: Socket,
  roomId: string,
  type: string,
  currentTime: number
) => {
  socket.emit("videoEvent", { roomId, type, currentTime });
};
