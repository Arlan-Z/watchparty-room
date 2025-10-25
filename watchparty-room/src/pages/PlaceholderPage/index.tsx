import { useNavigate } from 'react-router-dom';
import './Placeholder.css';
import { useState } from 'react';

export default function PlaceholderPage({ placeholderText } : { placeholderText?: string}) {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleJoinRoom = () => {
    if (!roomId.trim()) return;
    navigate(`/room/${roomId}`);
  };

  const handleCreateRoom = async () => {
    if (!videoUrl.trim()) return;

    try {
      const res = await fetch('/stream-service/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to create room');
      }

      const data = await res.json();
      navigate(`/room/${data.roomId}`);
    } catch (err) {
      console.error('Error creating room:', err);
      alert('⚠️ Failed to create room. Please try again.');
    }
  };

  return (
    <div className="placeholder-page-wrapper">
      <div className="message-box">
        {placeholderText ?? 'Welcome to WatchParty'}
      </div>

      <div className="form join-room">
        <label htmlFor="room-id-input">Enter room ID</label>
        <input 
          type="text" 
          name='room-id-input' 
          id='room-id-input'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button id='join-btn' onClick={handleJoinRoom}>Join</button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="form create-room">
        <button id='join-btn' onClick={handleCreateRoom}>Create</button>
        <input 
          type="text" 
          name='room-id-input' 
          id='room-id-input'
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <label htmlFor="room-id-input">Enter video URL</label>
      </div>
    </div>
  );
}