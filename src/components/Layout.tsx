"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import { Footer } from "./footer";
import { Modal } from "./modal";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Navbar isOpen={setModal} />
      <Modal isOpen={setModal} modal={modal} />
      {children}
      <Footer />
    </>
  );
};

