import { motion } from "framer-motion";

import React from "react";
import { NavList } from "./navlist";
import { MenuIcon } from "../svg";

function Navbar(props: { isOpen: (event: boolean) => void }) {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 }}
        className="navbar"
      >
        <a href="/">
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: [10, 0] },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.2 }}
            className="navbar-text"
          >
            MIE
          </motion.p>
        </a>
        <div className="navlist-cont">
          <ul className="navlist">
            <NavList />
          </ul>
          <button
            onClick={() => (window.location.href = "https://wa.link/ztm32r")}
            className="navlist__button"
          >
            Contact Me
          </button>
        </div>

        <motion.button
          whileTap={{ scaleY: 0 }}
          transition={{ duration: 1 }}
          onClick={() => props.isOpen(true)}
          className="modal-button"
        >
          <MenuIcon />
        </motion.button>
      </motion.div>
    </>
  );
}

export default Navbar;
