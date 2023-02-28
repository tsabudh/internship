import Dashboard from "./components/Dashboard/Dashboard";
import { useState, createContext } from "react";
import SignUp from "./components/SignUp/SignUp";
import { OverviewPage } from "./components/Dashboard/DashboardScreen/OverviewPage/OverviewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar/Sidebar";

import "./icon/variables.scss";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import DashboardScreen from "./components/Dashboard/DashboardScreen/DashboardScreen";
import TicketContainer from "./components/Dashboard/DashboardScreen/Tickets/TicketContainer";

export const LoggedInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState();

  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn , currentUser, setCurrentUser}}>
        <Routes>
          <Route path="/" element={<SignUp />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<DashboardScreen />}>
              <Route path="tickets" element={<TicketContainer />} />
              <Route path="overview" element={<OverviewPage />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
  // return <Dashboard />;
}

export default App;
