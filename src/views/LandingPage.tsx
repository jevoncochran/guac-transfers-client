import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import HeroSection from "../components/landing/HeroSection";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import PitchSection from "../components/landing/PitchSection";

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

  return (
    <>
      <HeroSection />
      <PitchSection />
    </>
  );
};

export default LandingPage;
