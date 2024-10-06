import { Link } from "react-scroll";

export const NavList = (props: { isOpen?: (event: boolean) => void }) => {
  return (
    <>
      <li className="navlist-item">
        <Link
          to="hero"
          spy={true}
          smooth={true}
          offset={-175}
          duration={500}
          onClick={() => props.isOpen && props.isOpen(false)}
        >
          Home
        </Link>
      </li>

      <li className="navlist-item">
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          onClick={() => props.isOpen && props.isOpen(false)}
        >
          About Me
        </Link>
      </li>
      <li className="navlist-item">
        <Link
          to="skills"
          spy={true}
          smooth={true}
          offset={-150}
          duration={500}
          onClick={() => props.isOpen && props.isOpen(false)}
        >
          Skills
        </Link>
      </li>

      <li className="navlist-item">
        <Link
          to="project"
          spy={true}
          smooth={true}
          offset={-90}
          duration={500}
          onClick={() => props.isOpen && props.isOpen(false)}
        >
          Projects
        </Link>
      </li>
    </>
  );
};
