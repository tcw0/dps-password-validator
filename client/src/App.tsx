import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Page404 from "./pages/Page404"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App
