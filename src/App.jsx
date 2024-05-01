import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import About from "./pages/About"
import Profile from "./pages/Profile"

export default function App() {
  
  return <BrowserRouter>
  <Routes>
     <Route path="/" element={< MainPage/>} />
     <Route path="/Login" element={< Login />} />
     <Route path="/Logout" element={< Logout />} />
     <Route path="/About" element={< About />} />
     <Route path="/Profile" element={< Profile />} />
  </Routes>
  </BrowserRouter>

}
