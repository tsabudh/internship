import React from "react";
import { NavLink, useMatch } from "react-router-dom";

const SidebarItem = ({ tool }) => {
const match = useMatch("/dashboard/tickets");

  return (
    <li className={useMatch(`/dashboard/${tool.name}`)?"active":null}>
      <NavLink to={tool.name} >
        <i className={`icon-${tool.iconName}`}></i>
        {tool.name}
      </NavLink>
    </li>
  );
};
const itemList1 = [
  { iconName: "overview", name: "Overview" },
  { iconName: "ticket", name: "Tickets" },
  { iconName: "idea", name: "Ideas" },
  { iconName: "contact", name: "Contacts" },
  { iconName: "agent", name: "Agents" },
  { iconName: "article", name: "Articles" },

];
const itemList2 = [
  { iconName: "settings", name: "Settings" },
  { iconName: "subscription", name: "Subscription" },
];

const sidebarItemList1 = [];
const sidebarItemList2 = [];

itemList1.forEach((tool, index) => {
  sidebarItemList1.push(<SidebarItem tool={tool} key={index} />);
});
itemList2.forEach((tool, index) => {
  sidebarItemList2.push(<SidebarItem tool={tool} key={index} />);
});

const Tools = () => {
  return (
    <nav>
      <ul>
        {sidebarItemList1}
       <hr></hr>
        {sidebarItemList2}
      </ul>
    </nav>
  );
};

export default Tools;
