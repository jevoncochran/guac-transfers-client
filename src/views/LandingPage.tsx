import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import HeroSection from "../components/HeroSection";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/transfer/send");
    }
  }, [user, navigate]);

  return <HeroSection />;
};

export default LandingPage;
