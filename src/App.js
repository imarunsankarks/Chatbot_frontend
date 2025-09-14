import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import ChatBot from './components/chatbot';
// import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import { useAuthContext } from "./hooks/useAuthContext";
// import Add from "./pages/Add";
const App = () => {
  // const { user } = useAuthContext();
  const user = false;

  return (
    <div className="app">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={<ChatBot />}
            // element={user ? <ChatBot /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
};

export default App;
