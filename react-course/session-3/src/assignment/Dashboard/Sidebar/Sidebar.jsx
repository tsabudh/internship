import React from "react";
import SidebarHeading from "./SidebarHeading";
import Tools from "./SidebarItems";

import "./sidebar.scss"

const Sidebar = () => {
  return (
    <aside className="dashboard_sidebar">
      <SidebarHeading />
      <Tools />
    </aside>
  );
};
export default Sidebar;
