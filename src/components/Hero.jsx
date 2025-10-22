import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const roles = [
  "Full Stack Developer",
  "Blockchain Developer",
  "AI Agent Developer",
  "Content Creator",
  "Fitness Trainer",
];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (charIndex < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentRole[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex]);

  return (
    <motion.section
      className="relative w-full h-screen mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Text container */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left vertical line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Text */}
        <div>
          {/* Glitch Name */}
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="glitch-text text-[#915EFF]" data-text="Madhan">
              Madhan
            </span>
          </h1>

          {/* Typing Role */}
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="text-[#915EFF]"
            >
              |
            </motion.span>
          </p>
        </div>
      </div>

      {/* 3D Background */}
      <ComputersCanvas />

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#915EFF] flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-[#915EFF] mb-1"
            />
          </div>
        </a>
      </div>

      {/* Glitch Effect CSS */}
      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
          color: white;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }
        .glitch-text::before {
          animation: glitchTop 1.5s infinite linear alternate-reverse;
          color: #915eff;
        }
        .glitch-text::after {
          animation: glitchBottom 1.5s infinite linear alternate-reverse;
          color: #6ee7b7;
        }

        @keyframes glitchTop {
          0% {
            clip: rect(0, 900px, 0, 0);
            transform: translate(-2px, -2px);
          }
          20% {
            clip: rect(0, 900px, 50px, 0);
            transform: translate(2px, -2px);
          }
          40% {
            clip: rect(0, 900px, 10px, 0);
            transform: translate(-3px, 2px);
          }
          60% {
            clip: rect(0, 900px, 20px, 0);
            transform: translate(3px, 0);
          }
          80% {
            clip: rect(0, 900px, 5px, 0);
            transform: translate(-1px, 1px);
          }
          100% {
            clip: rect(0, 900px, 0, 0);
            transform: translate(0, 0);
          }
        }

        @keyframes glitchBottom {
          0% {
            clip: rect(0, 900px, 0, 0);
            transform: translate(2px, 2px);
          }
          20% {
            clip: rect(0, 900px, 50px, 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip: rect(0, 900px, 10px, 0);
            transform: translate(3px, -2px);
          }
          60% {
            clip: rect(0, 900px, 20px, 0);
            transform: translate(-3px, 0);
          }
          80% {
            clip: rect(0, 900px, 5px, 0);
            transform: translate(1px, -1px);
          }
          100% {
            clip: rect(0, 900px, 0, 0);
            transform: translate(0, 0);
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
