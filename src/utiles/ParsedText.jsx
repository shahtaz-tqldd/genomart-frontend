import React from "react";
import ReactHtmlParser from "react-html-parser";
import "../assets/styles/tailwind-override.css";

const ParsedText = ({ content, className }) => {
  return (
    <div className={`override-tailwind ${className}`}>
      {ReactHtmlParser(content)}
    </div>
  );
};

export default ParsedText;
