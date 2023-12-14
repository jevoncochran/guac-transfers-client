import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import Divider from "./Divider";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <>
      <Navbar />
      {isLoggedIn && <Divider />}
      <Outlet />
    </>
  );
};

export default PageLayout;
