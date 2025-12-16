"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import { Footer } from "./footer";
import { Modal } from "./modal";
import { GSAPInit } from "./GSAPInit";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <GSAPInit />
      <Navbar isOpen={setModal} />
      <Modal isOpen={setModal} modal={modal} />
      {children}
      <Footer />
    </>
  );
};

