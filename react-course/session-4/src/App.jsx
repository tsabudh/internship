import Dashboard from "./components/Dashboard/Dashboard";
import { useState, createContext } from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./icon/variables.scss";

export const LoggedInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(); 

  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
  // return <Dashboard />;
}

export default App;
