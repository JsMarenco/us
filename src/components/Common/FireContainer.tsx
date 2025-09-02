// Third-party dependencies
import { type ReactNode } from "react";
import { motion } from "framer-motion";

// Current project dependencies

interface FireContainerProps {
  createdAt: string;
  children: ReactNode;
}

export default function FireContainer({
  createdAt,
  children,
}: FireContainerProps) {
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const isOnFire = Date.now() - new Date(createdAt).getTime() < SIX_HOURS;

  if (!isOnFire) return <>{children}</>;

  const particles = Array.from({ length: 15 }, (_, _i) => {
    const hue = Math.random() * 40 + 30;
    const lightness = Math.random() * 20 + 60;

    return {
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: 12 + Math.random() * 12,
      colorLight: `hsl(${hue}, 100%, ${lightness}%)`,
      colorDark: `hsl(${hue}, 90%, ${lightness * 0.6}%)`,
    };
  });

  return (
    <motion.div
      className="fire-container relative overflow-hidden rounded-xl border border-transparent"
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        boxShadow: "0 0 12px 2px rgba(255,200,100,0.35)",
        border: "1px solid rgba(255,200,100,0.4)",
      }}
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute font-bold opacity-80 select-none dark:opacity-70"
          style={{
            left: `${p.left}%`,
            bottom: "0%",
            fontSize: p.size,
            color: p.colorLight,
          }}
          animate={{
            y: ["0%", "-200%"],
            opacity: [0, 1, 0],
            rotate: [-30 + Math.random() * 60, 0, 30 - Math.random() * 60],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <span className="dark:hidden">
            {
              ["a", "e", "i", "o", "u", "*", "~", "•"][
                Math.floor(Math.random() * 8)
              ]
            }
          </span>
          <span className="hidden dark:inline" style={{ color: p.colorDark }}>
            {
              ["a", "e", "i", "o", "u", "*", "~", "•"][
                Math.floor(Math.random() * 8)
              ]
            }
          </span>
        </motion.span>
      ))}

      {children}
    </motion.div>
  );
}
