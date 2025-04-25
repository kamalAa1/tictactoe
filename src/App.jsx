import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import CouponBonus from "./pages/CouponBonus/CouponBonus.jsx";
import DailyBonus from "./pages/DailyBonus/DailyBonus.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Done from "./pages/Done.jsx";
import Mahjong from "./pages/Mahjong/Mahjong.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/index.jsx";
import PromotionalVideo from "./pages/PromotionalVideo/PromotionalVideo.jsx";
import Puzzle from "./pages/Puzzle/Puzzle.jsx";
import PuzzleWin from "./pages/PuzzleWin/PuzzleWin.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import Services from "./pages/Services/Services.jsx";
import Success from "./pages/Success.jsx";
import TermsAndConditions from "./pages/TermsAndConditions/index.jsx";
import TicTacToe from "./pages/TicTacToe/TicTacToe.jsx";
import usePageTracking from "./hooks/usePageTracking.js";
import ReactGA from "react-ga4";

// Initialize GA4
ReactGA.initialize("G-E2F85RDW6B");

const App = () => {
  usePageTracking();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.clear();
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/puzzle-win" element={<PuzzleWin />} />
        <Route path="/game" element={<TicTacToe />} />
        <Route path="/done" element={<Done />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mahjong" element={<Mahjong />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/services" element={<Services />} />
        <Route path="/daily-bonus" element={<DailyBonus />} />
        <Route path="/promotional-video" element={<PromotionalVideo />} />
        <Route path="/coupon-bonus" element={<CouponBonus />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: 99999,
        }}
      />
    </React.Fragment>
  );
};

export default App;
