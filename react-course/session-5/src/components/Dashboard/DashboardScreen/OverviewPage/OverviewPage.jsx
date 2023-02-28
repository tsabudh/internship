import DashHeader from "../DashHeader";
import "./overview-page.scss";

export const OverviewPage = () => {
  return (
    <div className="overview-container">
      <div className="overview-container_child">
        <p className="overview-container_child_status">Unresolved</p>
        <p className="overview-container_child_count">60</p>
      </div>
      <div className="overview-container_child">
        <p className="overview-container_child_status">Overdue</p>
        <p className="overview-container_child_count">16</p>
      </div>
      <div className="overview-container_child">
        <p className="overview-container_child_status">Open</p>
        <p className="overview-container_child_count">43</p>
      </div>
      <div className="overview-container_child">
        <p className="overview-container_child_status">On hold</p>
        <p className="overview-container_child_count">64</p>
      </div>
    </div>
  );
};
