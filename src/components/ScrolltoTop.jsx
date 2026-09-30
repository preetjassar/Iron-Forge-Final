import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrolltoTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="cursor-pointer fixed right-6 bottom-6 z-50 p-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-110 focus:outline-none"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrolltoTop;