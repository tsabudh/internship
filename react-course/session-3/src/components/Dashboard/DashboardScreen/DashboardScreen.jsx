import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
import { getTickets } from "../../SignUp/handleRequest";

import "./dashboard-screen.scss";

let tickets = [
  {
    customerAvatar: "tom-cruise.png",
    customerName: "Tom Cruise",
    customerDate: "on 24.05.2019",
    ticketName: "Contact Email not Linked",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 26, 2019",
    ticketTime: "6:30 PM",
    ticketPriority: "high",
  },

  {
    customerAvatar: "matt-damon.png",
    customerName: "Matt Damon",
    customerDate: "on 24.05.2019",
    ticketName: "Adding Images to Featured Posts",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 26, 2019",
    ticketTime: "8:00 PM",
    ticketPriority: "low",
  },

  {
    customerAvatar: "robert-downey.png",
    customerName: "Robert Downey",
    customerDate: "on 24.05.2019",
    ticketName: "When will I be charged this month?",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 26, 2019",
    ticketTime: "7:30 PM",
    ticketPriority: "high",
  },

  {
    customerAvatar: "christian-bale.png",
    customerName: "Christian Bale",
    customerDate: "on 24.05.2019",
    ticketName: "Payment not going through",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 25, 2019",
    ticketTime: "5:00 PM",
    ticketPriority: "normal",
  },

  {
    customerAvatar: "henry-cavil.png",
    customerName: "Henry Cavil",
    customerDate: "on 24.05.2019",
    ticketName: "Unable to add replies",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 25, 2019",
    ticketTime: "4:00 PM",
    ticketPriority: "high",
  },

  {
    customerAvatar: "chris-evans.png",
    customerName: "Chris Evans",
    customerDate: "on 24.05.2019",
    ticketName: "Downtime since last week",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 25, 2019",
    ticketTime: "2:00 PM",
    ticketPriority: "normal",
  },

  {
    customerAvatar: "sam-smith.png",
    customerName: "Sam Smith",
    customerDate: "on 24.05.2019",
    ticketName: "Referral Bonus",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 25, 2019",
    ticketTime: "11:30 PM",
    ticketPriority: "low",
  },

  {
    customerAvatar: "steve-rogers.png",
    customerName: "Steve Rogers ",
    customerDate: "on 24.05.2019",
    ticketName: "How do I change my password?",
    ticketInformation: "Updated 1 day ago",
    ticketDate: "May 24, 2019",
    ticketTime: "1:00 PM",
    ticketPriority: "normal",
  },
];


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
