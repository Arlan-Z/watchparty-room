import Chat from "./components/Chat";
import Video from "./components/Video";
import './RoomPage.css';

export default function RoomPage() {
  return (
    <div className="room-page-wrapper">
      <div className="video-box">
        <div className="video-wrapper">
          <Video src="https://www.pexels.com/download/video/6548176/" />
        </div>
      </div>

      <div className="chat-box">
        <Chat />
      </div>
    </div>
  );
}
