import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { Outlet } from "react-router-dom";

import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
import { getTickets } from "../../Signup/handleRequest";

import "./dashboard-screen.scss";

export const ticketContext = createContext();

const DashboardScreen = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [ticketArray, setTicketArray] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterMenuStatus, setFilterMenuStatus] = useState(false);
  const [filterBy, setFilterBy] = useState([]);

  useEffect(() => {
    getTickets(setTicketArray);
  }, []);

  const handleFilterBy = (e) => {
    let newFilterArray = [...filterBy];

    // if checked add to array
    if (e.target.checked && !newFilterArray.includes(e.target.value)) {
      newFilterArray = [...newFilterArray, e.target.value];
    }
    if (!e.target.checked && newFilterArray.includes(e.target.value)) {
      newFilterArray = newFilterArray.filter((item) => {
        if (item == e.target.value) {
          return null;
        } else {
          return item;
        }
      });
    }

    setFilterBy(newFilterArray);
  };

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };
  const handleFilter = (e) => {
    setFilterMenuStatus(!filterMenuStatus);
  };

  return (
    <div className="dashboard_screen">
      <DashHeader
        title="Tickets"
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        searchKey={searchKey}
        handleSearch={handleSearch}
      />
      <ticketContext.Provider
        value={{ ticketArray, searchKey, setTicketArray, filterBy }}
      >
        {/* <TicketContainer
          // searchKey={searchKey}
          // filterBy={filterBy}
          filterMenuStatus={filterMenuStatus}
          handleFilter={handleFilter}
          handleFilterBy={handleFilterBy}
          // ticketArray={ticketArray}
          // setTicketArray={setTicketArray}
        /> */}
       
       <Outlet />
      </ticketContext.Provider>
    </div>
  );
};

export default DashboardScreen;
