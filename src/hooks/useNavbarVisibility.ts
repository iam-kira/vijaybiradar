"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useNavbarVisibility() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Check if intro was seen
  useEffect(() => {
    const seen = typeof window !== "undefined" ? sessionStorage.getItem("vjb-intro-seen") : null;
    setIntroComplete(!!seen);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on landing page during intro (first 30% of scroll)
  // Show navbar after intro is complete or after 30% scroll
  useEffect(() => {
    const isLandingPage = pathname === "/" || pathname === "/vijaybiradar" || pathname === "";
    
    if (isLandingPage) {
      // On landing page: hide if intro not complete and scroll < 30%
      setIsVisible(introComplete || scrollPercentage > 0.3);
    } else {
      // On other pages: always show
      setIsVisible(true);
    }
  }, [pathname, introComplete, scrollPercentage]);

  return { isVisible, introComplete, setIntroComplete };
}
