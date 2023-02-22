import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/SignUp/SignUp";

import "./icon/variables.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="*" element={<p>Page not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  // return <Dashboard />;
}

export default App;
