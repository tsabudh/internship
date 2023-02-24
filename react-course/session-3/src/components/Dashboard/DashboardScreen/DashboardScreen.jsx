import React from "react";
import { useState, useEffect } from "react";


import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
import { getTickets } from "../../SignUp/handleRequest";

import "./dashboard-screen.scss";




const DashboardScreen = () => {
  const [searchStatus, setSearchStatus] = useState(false);

  const [ticketArray, setTicketArray] = useState([]);
  // setTicketArray(getTickets())

  const [searchKey, setSearchKey] = useState("");

  const [filterMenuStatus, setFilterMenuStatus] = useState(false);

  const [filterBy, setFilterBy] = useState([]);

  useEffect(() => {
    getTickets(setTicketArray);
  }, []);

  const handleFilterBy = (e) => {
    console.log(e.target.checked);
    let newFilterArray = [...filterBy];

    // if checked add to array
    if (e.target.checked && !newFilterArray.includes(e.target.value)) {
      newFilterArray = [...newFilterArray, e.target.value];
      console.log("checked new");
    }
    if (!e.target.checked && newFilterArray.includes(e.target.value)) {
      newFilterArray = newFilterArray.filter((item) => {
        if (item == e.target.value) {
          console.log("unchecked checked item");
          return null;
        } else {
          console.log(
            "returning item becoz target unchecked but value exists in array"
          );
          return item;
        }
      });
    }

    setFilterBy(newFilterArray);
    console.log([filterBy]);
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
      
      <TicketContainer
        searchKey={searchKey}
        filterMenuStatus={filterMenuStatus}
        handleFilter={handleFilter}
        filterBy={filterBy}
        handleFilterBy={handleFilterBy}
        ticketArray={ticketArray}
        setTicketArray={setTicketArray}
      />
    </div>
  );
};

export default DashboardScreen;
