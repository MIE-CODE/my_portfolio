import { CallIcon, LinkdenIcon, MailIcon } from "@/src/svg";
import { useEffect, useState } from "react";
import { FlipIcons } from "../animation/flipText";

export const Footer = () => {
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    const date = new Date();
    const currentYear = date?.getFullYear();
    setYear(currentYear.toString());
  }, []);
  return (
    <div className="footer">
      <div className="footer-cont">
        <div className="footer-info">
          <p className="footer-info-lg">{`< Let’s Work Together >`}</p>
          <p className="footer-info-md">
            Committed to continuously staying up-to-date with industry
            <br /> trends to solve real-world challenges effectively.
          </p>
        </div>
        <div className="footer-mail-cont">
          <a className="footer-mail" href="mailto:israelvictor126@gmail.com">
            israelvictor126@gmail.com
          </a>
        </div>
        <div className="footer-coms">
          <div className="footer-coms-cont">
            <FlipIcons>
              <a href="mailto:israelvictor126@gmail.com">
                <MailIcon />
              </a>
            </FlipIcons>
            <FlipIcons>
              <a href="tel:+2349137437424">
                <CallIcon />
              </a>
            </FlipIcons>
            <FlipIcons>
              <a href="http://www.linkedin.com/in/israelmenyaga">
                <LinkdenIcon />
              </a>
            </FlipIcons>
          </div>
          <div className="footer-rights">
            <p>© {year} MIE. All rights reserved. </p>
          </div>
        </div>
      </div>
    </div>
  );
};
