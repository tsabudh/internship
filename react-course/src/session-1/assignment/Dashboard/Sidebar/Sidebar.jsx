import React from "react";
import BookmarkHeading from "./SidebarHeading";
import Tools from "./SidebarItems";

class Bookmark extends React.Component {
  render() {
    return (
      <div className="dashboard_sidebar">
        <BookmarkHeading />
        <Tools />
      </div>
    );
  }
}
export default Bookmark;
