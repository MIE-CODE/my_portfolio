import { useState } from "react";
import { Card } from "./card";
import { AnimatePresence, motion } from "framer-motion";
import todoApp from "../images/todoapp.png";
import currenttime from "../images/currenttime.png";
import ecommerce from "../images/ecommerce.png";
import trueperk from "../images/trueperk.png";
import sparkpay from "../images/sparkpay.png";
import flyverge from "../images/flyverge.png";
export const Projects = () => {
  const [apps, setApps] = useState(false);

  const appsData = [
    {
      img: ecommerce,
      skills: ["flutter", "Dart", "C++"],
      title: "E-commerce",
      description:
        " Our AI technology generates pre-filled answers to grant  application questions based on your business information, saving  you time and ensuring comprehensive responses.",
      //download link
      link: "download",
      githubLink: "github",
    },
    {
      img: ecommerce,
      skills: ["flutter", "Dart", "C++"],
      title: "Coffee maker",
      description: "",
      link: "",
      githubLink: "",
    },
    {
      img: ecommerce,
      skills: ["flutter", "Dart", "C++"],
      title: "Geo time app",
      description: "",
      link: "",
      githubLink: "",
    },
  ];
  const websitesData = [
    {
      img: trueperk,
      skills: ["Nuxtjs", "Vuejs", "TypeScript", "Tailwindcss"],
      title: "Trueperk",
      description:
        "Trueperk is an AI-driven app that recognizes employee milestones, manages perks, tracks progress, and enables seamless reward redemption.",
      link: "https://app.trueperk.co/",
      githubLink: "#",
    },
    {
      img: sparkpay,
      skills: ["Nextjs", "React", "TypeScript", "scss"],
      title: "SparkPay",
      description:
        "SparkPay is a payroll software as a service solution geared towards bringing ease to the process of processing, creating and running payrolls.",
      link: "https://www.sparkpayhq.com/",
      githubLink: "#",
    },
    {
      img: flyverge,
      skills: ["Nextjs", "React", "TypeScript", "tailwindcss"],
      title: "Fly-verge",
      description:
        "A seamless flight booking app with real-time updates and smooth user experience.",
      link: "https://flyverge.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/flyverge",
    },
    {
      img: ecommerce,
      skills: ["Reactjs", "Taiwindcss"],
      title: "E-commerce",
      description:
        "I built a modern e-commerce application using React for efficient state management, Tailwind CSS for responsive and customizable styling, and Framer Motion to add smooth animations and interactive user experiences. The app offers a seamless shopping experience with dynamic transitions and a visually engaging interface.",
      link: "https://e-commerce-site-five-psi.vercel.app/",
      githubLink: "github",
    },
    {
      img: todoApp,
      skills: ["Vuejs", "Javascript", "Taiwindcss"],
      title: "Todo App",
      description:
        "This app is built with Vue.js, JavaScript, HTML, and CSS to deliver a seamless and interactive user experience. Leveraging Vue.js for its reactive components, the app is optimized for performance and ease of use. HTML is used to structure the content, while CSS ensures a clean, responsive design. The combination of these technologies enables a dynamic, intuitive interface, making the app both user-friendly and highly efficient.",
      link: "https://todo-app-vuejs-chi.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/Todo-App-vuejs",
    },
    {
      img: ecommerce,
      skills: ["React", "Tailwindcss"],
      title: "Image Galllery",
      description:
        "image gallery application using Next.js, offering fast performance and server-side rendering for optimal image loading. The app features an intuitive drag-and-drop functionality, allowing users to easily organize and interact with their image collections, providing a smooth and dynamic user experience.",
      link: "https://mie-gallery.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/image-gallery",
    },
    {
      img: currenttime,
      skills: ["Javascript", "HTML", "Css"],
      title: "Current time",
      description:
        "image gallery application using Next.js, offering fast performance and server-side rendering for optimal image loading. The app features an intuitive drag-and-drop functionality, allowing users to easily organize and interact with their image collections, providing a smooth and dynamic user experience.",
      link: "https://current-time-five.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/current-time",
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
