import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="flex items-center text-slate-800 gap-8 lg:text-xl md:text-lg text-md">
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsFacebook className="text-white/90" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsInstagram className="text-white/90" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsTwitter className="text-white/90" />
      </a>
    </div>
  );
};

export default SocialMedia;
