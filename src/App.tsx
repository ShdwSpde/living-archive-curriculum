import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PathwayPage } from './pages/PathwayPage'
import { LessonPage } from './pages/LessonPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pathway/:pathwayId" element={<PathwayPage />} />
      <Route path="/pathway/:pathwayId/:duration" element={<PathwayPage />} />
      <Route path="/pathway/:pathwayId/:duration/unit/:unitId" element={<LessonPage />} />
      <Route path="/pathway/:pathwayId/:duration/unit/:unitId/:format" element={<LessonPage />} />
    </Routes>
  )
}
