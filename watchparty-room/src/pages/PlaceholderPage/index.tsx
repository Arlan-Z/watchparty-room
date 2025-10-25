import './Placeholder.css';

export default function PlaceholderPage({ placeholderText } : { placeholderText?: string}) {
  return (
    <div className="placeholder-page-wrapper">
      <div className="message-box">
        {placeholderText ?? 'Welcome to WatchParty'}
      </div>

      <div className="form join-room">
        <label htmlFor="room-id-input">Enter room ID</label>
        <input type="text" name='room-id-input' id='room-id-input'/>
        <button id='join-btn'>Join</button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="form create-room">
        <button id='join-btn'>Create</button>
        <input type="text" name='room-id-input' id='room-id-input'/>
        <label htmlFor="room-id-input">Enter video URL</label>
      </div>
    </div>
  );
}