import React from "react";

const Lordicon = ({ link, color, size, trigger, target }) => {
  const colorCode = color ? color : "#03C988";
  const fontSize = size ? size : 20;
  const triggerAction = trigger ? trigger : "hover";
  const targetApply = target ? target : "a";

  return (
    <lord-icon
      target={targetApply}
      src={`https://cdn.lordicon.com/${link}.json`}
      trigger={triggerAction}
      colors={`primary:${colorCode}`}
      style={{ width: `${fontSize}px`, height: `${fontSize}px` }}
    ></lord-icon>
  );
};

export default Lordicon;
