// Third-party dependencies
import { useCallback, useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

// Current project dependencies

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Button is displayed after scrolling for 100 pixels
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 100 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          aria-label="scroll back to top"
          className="z-40 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-400 text-gray-800 shadow-2xl backdrop-blur-3xl transition-colors dark:bg-gray-800/60 dark:text-gray-200"
          onClick={scrollToTop}
        >
          <FaAngleUp />
        </button>
      )}
    </>
  );
};

export default ScrollTop;
