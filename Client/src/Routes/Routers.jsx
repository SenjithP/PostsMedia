import { Routes, Route } from "react-router-dom";
// import NoMatch from "../Pages/NoMatch";
import UserRegisterPage from "../Pages/UserRegisterPage.jsx";
import UserLoginPage from "../Pages/UserLoginPage";
import UserHomePage from "../Pages/UserHomePage";
import PrivateRoute from "../Components/PrivateRoute.jsx"

const Routers = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<NoMatch />} /> */}
      <Route path="/" element={<UserRegisterPage />} />
      <Route path="/userRegistration" element={<UserRegisterPage />} />
      <Route path="/userLogin" element={<UserLoginPage />} />
      <Route path="/userHome" element={<PrivateRoute><UserHomePage /></PrivateRoute>} />

    </Routes>
  );
};

export default Routers;
