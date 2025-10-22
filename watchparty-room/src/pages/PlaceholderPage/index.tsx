import './Placeholder.css';

export default function PlaceholderPage({ placeholderText } : { placeholderText?: string}) {
  return (
    <div className="placeholder-page-wrapper">
      <div className="message-box">
        {placeholderText ?? 'Welcome to WatchParty'}
      </div>

      <div className="join-room-form-box">
        <label htmlFor="room-id-input">Enter room ID</label>
        <input type="text" name='room-id-input' id='room-id-input'/>
        <button id='join-btn'>Join</button>
      </div>
    </div>
  );
}