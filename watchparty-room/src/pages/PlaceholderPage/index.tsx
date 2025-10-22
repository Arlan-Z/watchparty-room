import './Placeholder.css';

export default function PlaceholderPage() {
  return (
    <div className="placeholder-page-wrapper">
      <div className="message-box">
        Welcome to WatchParty
      </div>

      <div className="join-room-form-box">
        <label htmlFor="room-id-input">Enter room ID</label>
        <input type="text" name='room-id-input' id='room-id-input'/>
        <button id='join-btn'>Join</button>
      </div>
    </div>
  );
}