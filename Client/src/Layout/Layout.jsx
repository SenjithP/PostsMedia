// import { useLocation } from "react-router-dom";
// import Footer from "../components/Footer/Footer";
import Routers from "../Routes/Routers";

const Layout = () => {
  // const location = useLocation();
  // const isUserHome = location.pathname.endsWith("/userHome");

  return (
    <>
      <main>
        <Routers />
      </main>
      {/* {!isUserHome && <Footer />} */}
    </>
  );
};

export default Layout;
