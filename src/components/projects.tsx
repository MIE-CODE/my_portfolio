import { useState } from "react";
import { Card } from "./card";
import { AnimatePresence, motion } from "framer-motion";
import todoApp from "../images/todoapp.png";
import currenttime from "../images/currenttime.png";
import ecommerce from "../images/ecommerce.png";
export const Projects = () => {
  const [apps, setApps] = useState(false);

  const appsData = [
    {
      img: "",
      skills: ["flutter", "Dart", "C++"],
      tittle: "E-commerce",
      description:
        " Our AI technology generates pre-filled answers to grant  application questions based on your business information, saving  you time and ensuring comprehensive responses.",
      //download link
      link: "download",
      githubLink: "github",
    },
    {
      img: "",
      skills: ["flutter", "Dart", "C++"],
      tittle: "Coffee maker",
      description: "",
      link: "",
      githubLink: "",
    },
    {
      img: "",
      skills: ["flutter", "Dart", "C++"],
      tittle: "Geo time app",
      description: "",
      link: "",
      githubLink: "",
    },
  ];
  const websitesData = [
    {
      img: ecommerce,
      skills: ["Reactjs", "Taiwindcss"],
      tittle: "E-commerce",
      description:
        "I built a modern e-commerce application using React for efficient state management, Tailwind CSS for responsive and customizable styling, and Framer Motion to add smooth animations and interactive user experiences. The app offers a seamless shopping experience with dynamic transitions and a visually engaging interface.",
      link: "https://e-commerce-site-five-psi.vercel.app/",
      githubLink: "github",
    },
    {
      img: todoApp,
      skills: ["Vuejs", "Javascript", "Taiwindcss"],
      tittle: "Todo App",
      description:
        "This app is built with Vue.js, JavaScript, HTML, and CSS to deliver a seamless and interactive user experience. Leveraging Vue.js for its reactive components, the app is optimized for performance and ease of use. HTML is used to structure the content, while CSS ensures a clean, responsive design. The combination of these technologies enables a dynamic, intuitive interface, making the app both user-friendly and highly efficient.",
      link: "https://todo-app-vuejs-chi.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/Todo-App-vuejs",
    },
    {
      img: "",
      skills: ["React", "Tailwindcss"],
      tittle: "Image Galllery",
      description:
        "image gallery application using Next.js, offering fast performance and server-side rendering for optimal image loading. The app features an intuitive drag-and-drop functionality, allowing users to easily organize and interact with their image collections, providing a smooth and dynamic user experience.",
      link: "",
      githubLink: "",
    },
    {
      img: currenttime,
      skills: ["Javascript", "HTML", "Css"],
      tittle: "Current time",
      description:
        "image gallery application using Next.js, offering fast performance and server-side rendering for optimal image loading. The app features an intuitive drag-and-drop functionality, allowing users to easily organize and interact with their image collections, providing a smooth and dynamic user experience.",
      link: "",
      githubLink: "",
    },
  ];

  return (
    <div id="project" className="projects">
      <div className="projects-hero">
        <div className="projects-hero-cont">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="info-hero-lg"
          >{`< My Dev Projects >`}</motion.p>
          <p className="info-hero-lg-md">
            software developer with over +3 years of practical experience in web
            and mobile development
          </p>
        </div>
        <div className="projects-action">
          <button
            className={`projects-action-apps ${apps ? "active" : ""} `}
            onClick={() => setApps(true)}
          >
            Apps
          </button>
          <button
            className={`projects-action-web ${apps ? "" : "active"} `}
            onClick={() => setApps(false)}
          >
            Websites
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait" onExitComplete={() => setApps(!apps)}>
        {apps ? (
          <div className="projects-card-cont">
            {appsData.map((item, i) => (
              <Card app appsData={item} index={i} key={i} />
            ))}
          </div>
        ) : (
          <div className="projects-card-cont">
            {websitesData.map((web, i) => (
              <Card appsData={web} index={i} key={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
