import React from "react";

const Logo = ({
    size = "w-40",      // Tailwind width control
    className = "",     // Extra styling if needed
}) => {
    return (
        <img
            src="/TodoifyLogo.png"
            alt="Todoify Logo"
            className={`${size} h-auto object-contain select-none ${className}`}
            draggable="false"
        />
    );
};

export default Logo;