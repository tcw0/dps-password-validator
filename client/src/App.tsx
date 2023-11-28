import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
