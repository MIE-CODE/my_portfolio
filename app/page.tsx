"use client";
import "../src/style/global.scss";
import { motion } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import { About } from "@/src/components/about";
import { Reveal } from "@/src/animation/Reveal";
import { Footer } from "@/src/components/footer";
import { Projects } from "@/src/components/projects";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Stack } from "@/src/components/stack";
import { Modal } from "@/src/components/modal";
import { useState } from "react";

export default function Home() {
  const [modal, setModal] = useState(false);
  const text = useTypewriter({
    words: ["Developer", "Engineer"],
    loop: true,
  });

  return (
    <main className="home">
      <div className="home__content">
        <Navbar isOpen={setModal} />
        <Modal isOpen={setModal} modal={modal} />
        <div id="hero" className="home__main">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.2 }}
            className="home__main-description"
          >
            <div className="home__main-description-hero">
              <p className="home__main-description-text-lg ">
                Software <span>{text[0]}</span> <Cursor cursorBlinking />{" "}
              </p>

              <p className="home__main-description-text-md">
                ( Nextjs React Flutter MongoDB Node.js Express.js )
              </p>
            </div>

            <p className="home__main-description-text-md">
              Specializing in React and Leveraging cut-edge technologies to
              bring web projects to life.
            </p>
          </motion.div>
          <div className="home__main-action">
            <Reveal>
              <a
                href="mailto:israelvictor126@gmail.com"
                className="home__main-action-email"
              >
                Email Me
              </a>
            </Reveal>
            <Reveal>
              <a href="#" className="home__main-action-cv">
                My Resume
              </a>
            </Reveal>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 0.25 }}
            className="home__main-image"
          />
        </div>

        <About />
        <Stack />
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
