import { Route, Routes } from 'react-router-dom'
import './App.css'
import PlaceholderPage from './pages/PlaceholderPage'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage />} />
      <Route path='/room' element={<RoomPage />}></Route>
    </Routes>
  )
}

export default App
