import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { LoggedInContext } from "../../App";
import Sidebar from "./Sidebar/Sidebar";
import DashboardScreen from "./DashboardScreen/DashboardScreen";

import "./dashboard.scss";

const checkUserLogAndRedirect = ({ navigate, isLoggedIn, setIsLoggedIn }) => {
  console.log("message");
  if (!isLoggedIn) {
    navigate("/");
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

  console.log("isloggedin",isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  })


  return (
    <div className="dashboard">
      <Sidebar />
      <DashboardScreen />
    </div>
  );
};

export default Dashboard;
