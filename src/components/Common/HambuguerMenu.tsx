// Third-party dependencies
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Current project dependencies
import cn from "../../utils/cn";
import navLinks from "../../constants/nav";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative sm:hidden">
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="z-50 cursor-pointer p-2 text-gray-800 dark:text-gray-200"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[45vw] max-w-[375px] min-w-[45%]",
          "bg-white shadow-lg transition-transform duration-200 dark:bg-gray-900",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute top-4 right-[-40px] z-50 flex h-10 w-14 items-center justify-center rounded-r-lg bg-white transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Hide menu"
        >
          ✕
        </button>

        <div className="scrollbar h-full overflow-y-auto">
          <nav className="flex flex-col gap-2 p-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-4 py-3 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
