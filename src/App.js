import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
    const [alert, setAlert] = useState(null);
    const newAlert = (type, message) => {
        setAlert({
            type: type,
            msg: message
        });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    const [mode, setMode] = useState("light");
    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "#212529";
            document.body.style.color = "white";
            
        } else {
            setMode("light");
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    };
    return (
        <>
            <NoteState newAlert={newAlert}>
                <Router>
                    <Navbar mode={mode} toggleMode={toggleMode} newAlert={newAlert} />
                    <Alert alert={alert} />
                    <Routes>
                        <Route exact path="/" element={<Home mode={mode} newAlert={newAlert} />} />
                        <Route exact path="/about" element={<About mode={mode} />} />
                        <Route exact path="/login" element={<Login mode={mode} newAlert={newAlert} />} />
                        <Route exact path="/signup" element={<SignUp mode={mode} newAlert={newAlert} />} />
                    </Routes>
                </Router>
            </NoteState>
        </>
    );
}

export default App;
