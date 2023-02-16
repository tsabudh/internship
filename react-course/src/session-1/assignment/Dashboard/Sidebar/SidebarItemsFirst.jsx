import React from "react";
const Tool = ({ tool }) => {
  return (
    <li>
      <a href="">
        <i className={`icon-${tool.iconName}`}></i>
        {tool.name}
      </a>
    </li>
  );
};

export default Tool;
