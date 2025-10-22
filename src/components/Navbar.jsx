import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full ${
        scrolled
          ? "backdrop-blur-md bg-[#050816]/60 shadow-md border-b border-[#915EFF]/30"
          : "bg-transparent"
      } ${styles.paddingX} py-5 flex items-center`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo + Title */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <motion.img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.2 }}
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex flex-col leading-tight">
            Madhan <span className="text-[#915EFF] text-[14px]">Full Stack & AI Dev</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                className={`relative text-[17px] font-medium transition-all duration-300 ${
                  active === nav.title ? "text-white" : "text-gray-400"
                } hover:text-white`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
                {/* Underline animation */}
                <span
                  className={`absolute left-0 bottom-[-4px] h-[2px] bg-[#915EFF] transition-all duration-300 ${
                    active === nav.title ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <motion.div
            initial={{ x: 100 }}
            animate={{ x: toggle ? 0 : 100 }}
            transition={{ duration: 0.4 }}
            className={`p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[180px] rounded-xl ${
              toggle ? "flex" : "hidden"
            } flex-col gap-4 border border-[#915EFF]/30`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    className={`text-[16px] font-medium ${
                      active === nav.title ? "text-white" : "text-gray-400"
                    } hover:text-[#915EFF] transition-colors duration-200`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
