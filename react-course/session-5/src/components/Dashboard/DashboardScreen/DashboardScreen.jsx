import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { Outlet, useMatch } from "react-router-dom";

import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
import { getTickets } from "../../Signup/handleRequest";

import "./dashboard-screen.scss";

export const ticketContext = createContext();
// export const addTicketContext = createContext();

const DashboardScreen = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [ticketArray, setTicketArray] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterMenuStatus, setFilterMenuStatus] = useState(false);
  const [filterBy, setFilterBy] = useState([]);
  const [inputData, setInputData] = useState({
    ticketName: "",
    ticketDateAndTime: new Date(
      new Date().getTime() + new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace(/.\d+Z$/g, ""),
    customerName: "",
    customerDate: new Date(),
    ticketPriority: "Normal",
  });

  // const match = useMatch()

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
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        searchKey={searchKey}
        handleSearch={handleSearch}
      />
      <ticketContext.Provider
        value={{
          ticketArray,
          searchKey,
          setTicketArray,
          filterBy,
          inputData,
          setInputData,
        }}
      >
     

        <Outlet
          context={[
            filterMenuStatus,
            handleFilter,
            handleFilterBy,
            inputData,
            setInputData,
          ]}
        />
      </ticketContext.Provider>
    </div>
  );
};

export default DashboardScreen;
