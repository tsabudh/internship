import React from "react";
import BookmarkHeading from "./BookmarkHeading";
import Tools from "./Tools";

class Bookmark extends React.Component {
  render() {
    return (
      <div className="dashboard__bookmark">
        <BookmarkHeading />
        <Tools />
      </div>
    );
  }
}
export default Bookmark;
