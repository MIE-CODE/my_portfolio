import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import card from "../images/card.png";
import { DownloadIcon, GithubIcon } from "../svg";
import Link from "next/link";
type AppsData = {
  img: StaticImageData;
  skills: string[];
  tittle: string;
  description: string;
  link: string;
  githubLink: string;
};

export const Card = (props: {
  index: number;
  appsData?: AppsData;
  app?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.1, 1], [0.6, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });

  const FadeIn = {
    initial: { opacity: 0, y: 100 },
    animate: (index: number) => ({
      y: 0,
      transition: {
        delay: 0.08 * index,
        duration: 0.8,
        times: [0, 0.25, 0.55, 1],
      },
    }),
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={FadeIn}
        custom={props.index}
        style={{ scale }}
        className="projects-card"
      >
        <div className="projects-card-info">
          <Image
            className="projects-card-image"
            src={props.appsData?.img || card}
            height={194}
            alt="image"
          />

          <p className="projects-card-info-sm">
            {" "}
            SkillS:{" "}
            {props.appsData?.skills.map((skill, i) => (
              <span key={i}>{skill} </span>
            ))}{" "}
          </p>

          <div className="projects-card-info-description">
            <p className="projects-card-info-lg">{props.appsData?.tittle}</p>
            <p className="projects-card-info-md">
              {props?.appsData?.description &&
              props?.appsData?.description.length > 20
                ? props?.appsData?.description.slice(0, 100)
                : props?.appsData?.description}{" "}
              {props?.appsData?.description && (
                <Link href="#">See more...</Link>
              )}
            </p>
          </div>
        </div>
        <div className="projects-card__link-cont">
          <div className="projects-card__link">
            <span className="projects-card__link-bullet"></span>
            <a
              className="projects-card__link-text"
              href={
                props.app
                  ? props.appsData?.githubLink
                  : props.appsData?.link || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.app ? "Github" : "Link"}
            </a>
          </div>
          <a
            className="projects-card__link-text github"
            href={props.app ? props.appsData?.link : props.appsData?.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.app ? <DownloadIcon /> : <GithubIcon />}
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
