# WatchParty Room Frontend

WatchParty Room is a Vite-powered React application that provides a shared video player alongside a realtime group chat, letting viewers join a specific room and interact while watching the same content.

## Features

- **Room-aware routing** – Uses React Router to resolve room identifiers from the `/room/:roomId` route and gracefully handles missing rooms with a placeholder screen.
- **Embedded video playback** – Renders a hosted MP4 stream inside the `Video` component so everyone in the room watches the same video feed.
- **Realtime chat** – Connects to a Socket.IO server, joins the current room, and streams new messages into the chat timeline while persisting history via a REST fetch.
- **Persistent user identity** – Generates a browser-stored UUID so each participant keeps a consistent sender identity across refreshes.
- **Responsive layout** – Splits the interface into video and chat columns that scale for common desktop breakpoints.

## Getting started

### Prerequisites

- Node.js 18 or newer.
- npm 9+ (ships with Node 18). Yarn/PNPM also work but the supplied scripts assume npm.

### Installation

```bash
npm install
```

### Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite dev server on <http://localhost:5173>. Proxies should forward `/api/*` and Socket.IO traffic to backend. |

## Development notes

- The chat module expects a Socket.IO server reachable at the same origin (the client calls `io('/')`). Configure a Vite proxy or run the frontend behind the same domain as the backend.
- Chat history is loaded from `GET /api/chat/:roomId`. Adjust the `fetch` call in `src/pages/RoomPage/components/Chat/index.tsx` if your backend exposes a different route.
- The sample video source comes from Pexels and is suitable for development only. Swap the `src` prop passed to the `Video` component to point to your own HLS/MP4 stream for production use.
- User identifiers are generated and cached via `src/utils/userUtils.ts`. If your authentication model differs, integrate your auth provider there so every message carries the correct sender metadata.

## Project structure

```
src/
├── App.tsx                  # Route definitions
├── pages/
│   ├── PlaceholderPage/     # Generic placeholder and error screen
│   └── RoomPage/            # Room layout combining Video + Chat
│       └── components/
│           ├── Video/       # Video player wrapper
│           └── Chat/        # Chat timeline, footer, and message rendering
├── models/                  # Shared TypeScript interfaces (e.g., Message)
└── utils/                   # Helpers such as user identity persistence
```

## Project Screenshots
### Welcome Page
![alt text](img\welcome.png)
### Error Page
![alt text](img\404.png)
### Room Page
![alt text](img\room.png)