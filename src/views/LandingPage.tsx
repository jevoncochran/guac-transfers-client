import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/us/en/transfer/send");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
};

export default LandingPage;
