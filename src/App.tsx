import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Sections
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Introduction from "./sections/Introduction";
import Programs from "./sections/Programs";
import ResearchSpotlight from "./sections/ResearchSpotlight";
import CampusLife from "./sections/CampusLife";
import Partners from "./sections/Partners";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  const handleNavigate = (id: string) => {
    if (lenisRef.current) {
      const target = document.getElementById(id);
      if (target) {
        lenisRef.current.scrollTo(target, { offset: 0 });
      }
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <div className="relative">
              <Navigation onNavigate={handleNavigate} />
              <Hero onNavigate={handleNavigate} />
              <Introduction />
              <Programs />
              <ResearchSpotlight />
              <CampusLife />
              <Partners />
              <CTA />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
