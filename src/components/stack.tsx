import { motion, useScroll, useTransform } from "framer-motion";
import {
  CssIcon,
  ExpressIcon,
  FlutterIcon,
  FramerMotionIcon,
  GithubIcon,
  GsapIcon,
  HtmlIcon,
  JavaScriptIcon,
  MjmlIcon,
  MongoDBIcon,
  NestIcon,
  NextIcon,
  ReactIcon,
  SassIcon,
  TailwindcssIcon,
  TypeScriptIcon,
} from "../svg";

export const Stack = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.9, 1]);
  const FadeIn = {
    initial: { opacity: 0, y: 100 },
    animate: (index: number) => ({
      opacity: [0, 0.5, 0.8, 1],
      y: 0,
      transition: {
        delay: 0.05 * index,
        duration: 0.5,
        times: [0, 0.25, 0.7, 1],
      },
    }),
  };
  const stacks = [
    {
      icon: <NextIcon />,
      name: "Nextjs",
      info: "( Prefessional ) in nextjs knowledge and advanced development, providing (SSR), (SSG), and API routes out of the box.",
    },
    {
      icon: <ReactIcon />,
      name: "Reactjs",
      info: "( Prefessional )  react knowledge for building user interfaces, especially single-page applications (SPA).",
    },
    {
      icon: <TypeScriptIcon />,
      name: "TypeScript",
      info: "( Prefessional ) in typescript that adds static typing to the language, reducing bugs and improving code maintainability.",
    },

    {
      icon: <JavaScriptIcon />,
      name: "JavaScript",
      info: "( Prefessional ) in the core language of the web, used for adding interactive behavior to my websites.",
    },
    {
      icon: <SassIcon />,
      name: "SASS",
      info: "( Prefessional ) in sass, a CSS preprocessor that allows for variables, nested rules, and reusable styles (mixins).",
    },
    {
      icon: <TailwindcssIcon />,
      name: "Tailwindcss",
      info: "( Prefessional ) in tailwind, CSS framework that allows for quick and consistent UI design by composing classes directly in HTML.",
    },
    {
      icon: <FramerMotionIcon />,
      name: "Framer-motion",
      info: "( Prefessional ) in framer-motion a React-based animation library that makes creating smooth, interactive animations simple.",
    },
    {
      icon: <GsapIcon />,
      name: "Gsap",
      info: "( Intermediate ) in gsap a powerful JavaScript library for creating high-performance animations.",
    },
    {
      icon: <GithubIcon />,
      name: "Git & Github",
      info: "( Prefessional ) in github a version control platform where you can manage projects, track changes, and collaborate on code using Git.",
    },
    {
      icon: <HtmlIcon />,
      name: "HTML",
      info: "( Prefessional ) in HTML a Fundamental to structuring web pages, ensuring accessible and responsive designs.",
    },
    {
      icon: <CssIcon />,
      name: "Css",
      info: "( Prefessional ) in HTML a Fundamental to style pages, ensuring accessible and visually appealing responsive designs.",
    },
    {
      icon: <MjmlIcon />,
      name: "Mjml",
      info: "( Prefessional ) in MJML a markup language designed to build responsive email templates that work across different email clients and devices.",
    },
    {
      icon: <FlutterIcon />,
      name: "flutter",
      info: "( Intermediate ) in Flutter a UI toolkit for building natively compiled mobile, web, and desktop applications from a single codebase.",
    },
    {
      icon: <MongoDBIcon />,
      name: "MongoDb",
      info: "( Intermediate ) in MongoDb a NoSQL database that stores data in JSON-like documents, providing flexibility and scalability for projects with unstructured data.",
    },
    {
      icon: <ExpressIcon />,
      name: "Express",
      info: "( Intermediate ) in Express a lightweight web framework for Node.js, useful for building RESTful APIs and web applications.",
    },
    {
      icon: <NestIcon />,
      name: "Nestjs",
      info: "( Intermediate ) in Nestjs a framework built on top of Express.js (or Fastify) for developing scalable, efficient, and well-structured server-side applications.",
    },
  ];
  return (
    <>
      <div id="skills" className="skills">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="info-hero-lg"
        >{`< My Stacks >`}</motion.p>

        <div className="info-stack">
          {stacks.map((stack, i) => (
            <>
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={FadeIn}
                className="info-stack-cont"
                key={i}
                custom={i}
                style={{ scale }}
              >
                <div>{stack.icon}</div>

                <div className="info-stack-description">
                  <p
                    style={{ textAlign: "left" }}
                    className="info-stack-description-lg"
                  >
                    {stack.name}
                  </p>

                  <p className="info-stack-description-md">{stack.info}</p>
                </div>
              </motion.div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
