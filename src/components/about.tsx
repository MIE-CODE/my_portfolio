import { motion } from "framer-motion";

export const About = () => {
  const infos = [
    {
      title: "Full Stack Developer",
      desc: "I develop full-stack web applications using the MERN stack that are responsive, fast, and scalable. Proficient in handling both frontend and backend, ensuring seamless integration of services.",
    },
    {
      title: "Specializing in React & NestJs",
      desc: "Mastery in building dynamic, component-based web applications using React & Next.js . I leverage tools like React hooks, React Context API, and Redux to manage state efficiently and create highly interactive user interfaces. From routing to API integration, I utilize Next.js to deliver high-performance, scalable apps.",
    },
    {
      title: "Mobile Deveolopment",
      desc: "I also specialize in Flutter, an open-source framework developed by Google, which allows for the creation of high-performance, cross-platform mobile applications using a single codebase. This means I can deliver apps that run smoothly on both iOS and Android devices without the need for two separate development processes.",
    },
    {
      title: "Git and GITHUB",
      desc: "As a developer with over 4 years of experience, Git and GitHub are core tools I rely on for version control and team collaboration. These platforms allow me to efficiently manage and track changes in codebases, whether working solo or with a team.",
    },
  ];
  return (
    <div id="about" className="info">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 }}
        className="info-hero"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="info-hero-lg"
        >
          {" "}
          {"<Solutions-Oriented Developer>"}
        </motion.p>
        <p className="info-hero-md">
          software developer with over +2 years of practical experience in web
          and mobile development
        </p>
      </motion.div>
      <div id="aboutsec" className="info-about">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3, delay: 0.2 }}
          className="info-about-l"
        >
          {infos.map((info, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1 * i, delay: 0.2 * i }}
              className="info-about-l__cont"
            >
              {i === 0 && (
                <p className="info-about-l-lg">I am Menyaga Israel :</p>
              )}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.4 * i,
                  repeat: Infinity,
                }}
                className="info-about-l__bullet"
              ></motion.span>
              <p className="info-about-l-sm">
                <span className="info-about-l-md"> {info.title}:</span>{" "}
                {info.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3, delay: 0.2 }}
          className="info-about-r"
        ></motion.div>
        <div className="info-about-radial"></div>
      </div>
    </div>
  );
};
