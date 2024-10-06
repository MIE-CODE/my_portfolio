import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CloseIcon } from "../svg";
import { NavList } from "./navlist";

export const Modal = (props: {
  isOpen: (event: boolean) => void;
  modal: boolean;
}) => {
  return (
    <AnimatePresence mode="wait" onExitComplete={() => props.isOpen(false)}>
      {props.modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => props.isOpen(false)}
          className="modal-backdrop"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            exit={{ width: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="modal"
          >
            <div className="modal-action">
              <motion.button
                whileTap={{ rotate: 720 }}
                transition={{ duration: 4 }}
                onClick={() => props.isOpen(false)}
                className="modal-button"
              >
                <CloseIcon />
              </motion.button>
            </div>
            <ul className="modal-navlist">
              <NavList isOpen={props.isOpen} />
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
