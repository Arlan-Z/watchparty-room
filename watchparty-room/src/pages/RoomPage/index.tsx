import { useParams } from "react-router-dom";
import Chat from "./components/Chat";
import Video from "./components/Video";
import './RoomPage.css';
import PlaceholderPage from "../PlaceholderPage";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function RoomPage() {
  const { roomId } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);

   
  useEffect(() => {
    if (!roomId) {
      setRoomExists(false);
      return;
    }

    fetch(`/stream-service/api/rooms/${roomId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Room not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.id) {
          setRoomExists(true);
        } else {
          setRoomExists(false);
        }
      })
      .catch(() => setRoomExists(false));
  }, [roomId]);

  if (roomExists === null) {
    return <Loading/>
  }

  if (!roomExists) {
    return <PlaceholderPage placeholderText="Room not found" />;
  }

  return (
    <div className="room-page-wrapper">
      <div className="video-box">
        <div className="video-wrapper">
          <Video roomId={roomId!}/>
        </div>
      </div>

      <div className="chat-box">
        <Chat roomId = {roomId!}/>
      </div>
    </div>
  );
}
