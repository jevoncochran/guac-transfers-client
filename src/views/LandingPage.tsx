import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import HeroSection from "../components/HeroSection";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/transfer/send");
    }
  }, [isLoggedIn, navigate]);

  return <HeroSection />;
};

export default LandingPage;
