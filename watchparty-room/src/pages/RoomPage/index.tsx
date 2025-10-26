import { useParams } from "react-router-dom";
import Chat from "./components/Chat";
import Video from "./components/Video";
import './RoomPage.css';
import PlaceholderPage from "../PlaceholderPage";
import Loading from "../../components/Loading";
import { useRoomCheck } from "./hooks/useRoomCheck";

export default function RoomPage() {
  const { roomId } = useParams();
  const { roomExists } = useRoomCheck(roomId);

  if (roomExists === null) {
    return <Loading />;
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
