import {  useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="404">
      <button onClick={goBack}>Back</button>
      <p>404 Page Not found</p>
    </div>
  );
};
