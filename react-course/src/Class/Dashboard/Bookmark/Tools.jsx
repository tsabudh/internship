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
  "Subscription",
];
const tools = [];
toolsList.forEach((tool, index) => {
  tools.push(<Tool toolName={tool} key={index} />);
});
class Tools extends React.Component {
  render() {
    return tools;
  }
}

export default Tools;
