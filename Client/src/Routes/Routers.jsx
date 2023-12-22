import { Routes, Route } from "react-router-dom";
// import NoMatch from "../Pages/NoMatch";
import UserRegisterPage from "../Pages/UserRegisterPage.jsx";
import UserLoginPage from "../Pages/UserLoginPage";
import UserHomePage from "../Pages/UserHomePage";

const Routers = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<NoMatch />} /> */}
      <Route path="/userRegistration" element={<UserRegisterPage />} />
      <Route path="/userLogin" element={<UserLoginPage />} />
      <Route path="/userHome" element={<UserHomePage />} />
    </Routes>
  );
};

export default Routers;
