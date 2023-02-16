import React from "react";
import Tool from "./SidebarItemsFirst";

const toolsList = [
  { iconName: "overview", name: "Overview" },
  { iconName: "ticket", name: "Tickets" },
  { iconName: "idea", name: "Ideas" },
  { iconName: "contact", name: "Contacts" },
  { iconName: "agent", name: "Agents" },
  { iconName: "article", name: "Articles" },
  { iconName: "settings", name: "Settings" },
  { iconName: "subscription", name: "Subscription" },
  
];
const tools = [];

toolsList.forEach((tool, index) => {
  tools.push(<Tool tool={tool} key={index} />);
});

const Tools = () => {
  return (
    <nav>
      <ul>{tools}</ul>
    </nav>
  );
};

export default Tools;
