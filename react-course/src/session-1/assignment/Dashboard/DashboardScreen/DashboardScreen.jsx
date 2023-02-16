import React from "react";
import { useState } from "react";
import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
const DashboardScreen = () => {
  const [searchStatus, setSearchStatus] = useState(false);

  const [searchKey, setSearchKey] = useState("");

  const [filterMenuStatus, setFilterMenuStatus] = useState(false);

  const [filterBy, setFilterBy] = useState(null);

  const handleFilterBy = (e) => {
    
    setFilterBy(e.target.value);
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
      />
    </div>
  );
};

export default DashboardScreen;
