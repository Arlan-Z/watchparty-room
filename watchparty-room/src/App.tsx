import { Route, Routes } from 'react-router-dom'
import './App.css'
import PlaceholderPage from './pages/PlaceholderPage'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path="*" element={<PlaceholderPage placeholderText='404 PAGE NOT FOUND'/>} />
    </Routes>
  )
}

export default App
