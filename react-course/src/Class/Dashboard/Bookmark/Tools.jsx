import React from "react";
import Tool from "./Tool";
const toolsList = [
  "Overview",
  "Tickets",
  "Ideas",
  "Contacts",
  "Agents",
  "Articles",
  "Settings",
  "Subscription"
];
const tools = [];
toolsList.forEach((tool) => {
  tools.push(<Tool toolName={tool}/>);
 
});
class Tools extends React.Component {
  render() {
    return tools;
  }
}

export default Tools;
