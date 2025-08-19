// Third-party dependencies
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Current project dependencies
import cn from "../../utils/cn";
import { hamburguerNavLinks } from "../../constants/nav";
import useAuth from "../../hooks/useAuth";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, error } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="z-50 cursor-pointer p-2 text-gray-800 dark:text-gray-200"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              className={cn(
                "fixed top-0 left-0 z-50 h-full w-[45vw] max-w-[300px] min-w-[65%]",
                "flex flex-col bg-white shadow-lg dark:bg-black",
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              {!loading && !error && user && (
                <motion.div
                  className="flex items-center gap-3 border-b border-gray-200 p-4 backdrop-blur-xs dark:border-gray-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={user.avatarSrc}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div className="ml-1 flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {user.username}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="scrollbar flex-1 overflow-y-auto p-2">
                <nav className="flex flex-col gap-4">
                  {hamburguerNavLinks.map((section) => (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1"
                    >
                      <motion.span
                        className="px-4 py-2 text-sm font-extrabold tracking-wide text-gray-800 uppercase dark:text-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {section.label}
                      </motion.span>

                      {section.links.map((link, index) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="rounded-md px-4 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="flex justify-center border-t border-gray-200 p-4 dark:border-gray-700">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Cerrar menú
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
