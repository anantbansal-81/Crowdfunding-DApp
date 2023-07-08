import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={` font-epoligue font-semibold text-[16px] leading-[26px] p-4 text-white min-h-[52px] rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
