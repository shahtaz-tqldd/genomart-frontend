import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const SocialMedia = ({ about = false }) => {
  return (
    <div
      className={`flex items-center gap-8 lg:text-xl md:text-lg text-md ${
        about ? "text-primary" : "text-white/90"
      }`}
    >
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsFacebook />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsInstagram />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsTwitter />
      </a>
    </div>
  );
};

export default SocialMedia;
