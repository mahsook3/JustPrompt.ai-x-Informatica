import { motion, useViewportScroll, useTransform } from "framer-motion";
import React from "react";
import Banner from "../assets/banner2.svg";
import Achievement from "../components/Achievement";

export default function BannerComponent() {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.5]);

  return (
    <>
      <div
        className="w-full mx-auto pt-20 text-center pd:w-10/12 pb-40 bg-gradient-to-b from-green-50 to-white"
        id="dashboard-image"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="relative z-0 w-full mt-8">
          <div className="relative overflow-visible">
            <motion.img
              src={Banner}
              alt="Dashboard"
              className="w-1/2 h-auto mx-auto"
              style={{ scale }}
            />
          </div>
        </div>
      </div>
      <Achievement />
    </>
  );
}
