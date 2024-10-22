import React from "react";

const GridBackground = () => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
    >
      {/* Define gradient for fading effect */}
      <defs>
        <radialGradient id="fadeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#73EC8B" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#73EC8B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid pattern */}
      <pattern
        id="gridPattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="#73EC8B"
          strokeWidth="1"
          opacity="0.2"
        />
      </pattern>

      {/* Apply grid pattern to full screen */}
      <rect width="100%" height="100%" fill="url(#gridPattern)" />

      {/* Apply the gradient for fading at the corners */}
      <rect width="100%" height="100%" fill="url(#fadeGradient)" />
    </svg>
  );
};

export default GridBackground;
