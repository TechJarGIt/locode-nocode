import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Create from "./components/Create";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="bg-white">
      <AuthProvider>
        <Navbar/>

        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/login" element={ <Login/>} />
          <Route path="/register" element={ <Register/>} />
          <Route path="/create" element={ <Create/>} />
          <Route path="/about" element={ <About/>} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
