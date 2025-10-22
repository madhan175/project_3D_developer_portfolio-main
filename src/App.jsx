import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CoverAnimation from "./components/CoverAnimation";
import GraphBackground from "./components/GraphBackground";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  const [showCover, setShowCover] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showCover ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <CoverAnimation onAnimationComplete={() => setShowCover(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-screen relative overflow-hidden text-white"
          >
            {/* Full-page Graph Line Background */}
            <GraphBackground />

            <div className="relative z-10">
              <Navbar />

              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Hero />
              </motion.div>

              {/* Page Sections */}
              <About />
              <Experience />
              <Tech />
              <Works />
              <Feedbacks />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Contact />
                <StarsCanvas />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
