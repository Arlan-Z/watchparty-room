import { useParams } from "react-router-dom";
import Chat from "./components/Chat";
import Video from "./components/Video";
import './RoomPage.css';
import PlaceholderPage from "../PlaceholderPage";

export default function RoomPage() {
   const { roomId } = useParams();
   if (!roomId) {
    return <PlaceholderPage placeholderText="Room not Found"/>
   }

  return (
    <div className="room-page-wrapper">
      <div className="video-box">
        <div className="video-wrapper">
          <Video roomId={roomId}/>
        </div>
      </div>

      <div className="chat-box">
        <Chat roomId = {roomId}/>
      </div>
    </div>
  );
}
