import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="flex items-center text-slate-800 gap-8 lg:text-xl md:text-lg text-md">
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsFacebook className="hover:scale-125 tarnsition duration-300" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsInstagram className="hover:scale-125 tarnsition duration-300" />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer">
        <BsTwitter className="hover:scale-125 tarnsition duration-300" />
      </a>
    </div>
  );
};

export default SocialMedia;
