"use client";
import { FaArrowUp } from "react-icons/fa";

const ButtonToTop = (props) => {
  return (
    <>
      <button
        className={`fixed bottom-6 right-6 bg-gray-800 text-white rounded-full p-3 transition-opacity duration-300 shadow-md ${
          props.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={props.scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default ButtonToTop;