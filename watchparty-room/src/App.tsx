import { Route, Routes } from 'react-router-dom'
import './App.css'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage />} />
    </Routes>
  )
}

export default App
