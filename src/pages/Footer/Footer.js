import React from "react";
import {
  FiFacebook,
  AiOutlineHeart,
  AiOutlineInstagram,
  IoLogoYoutube,
} from "react-icons/all";
import { Input, Stack } from "@chakra-ui/react";
import "./footercss.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footerCmp">
      <footer>
        <div className="footerCategorie">
          <h1>Recent policies</h1>
          <ul>
            <li>
              <Link to="/">2022</Link>
            </li>
            <li>
              <Link to="/">2021</Link>
            </li>
            <li>
              <Link to="/">2020</Link>
            </li>
            <li>
              <Link to="/">2019</Link>
            </li>
          </ul>
        </div>

        <div className="fooHelp">
          <h1>Help</h1>
          <ul>
            <li>Tracke Order</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footerGetInTouch">
          <h1>Get in touch</h1>
          <ul>
            <p>
              Any questions? Let us know in store at XY 123 North example BB,
              80000 or call us on (+92) 12345678
            </p>
            <li className="footerIcons">
              <FiFacebook size="25" />
            </li>
            <li className="footerIcons">
              <AiOutlineInstagram size="25" />
            </li>
            <li className="footerIcons">
              <IoLogoYoutube size="25" />
            </li>
          </ul>
        </div>

        <div className="paragraphFooter">
          <p>Copyright ©2022 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
