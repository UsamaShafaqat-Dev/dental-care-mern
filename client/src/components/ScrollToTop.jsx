import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har baar jab rasta (URL) badle ga, ye screen ko 0,0 (Top) par le jaye ga
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
