// Third-party dependencies
import { motion } from "framer-motion";
import { useState } from "react";

// Current project dependencies
import cn from "../../../utils/cn";
import BackgroundPortal from "../../Common/BackgroundPortal";

interface AnimatedAvatarProps {
  src: string;
}

export default function AnimatedAvatar({ src }: AnimatedAvatarProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <BackgroundPortal src={src} hover={hover} />

      <motion.img
        src={src}
        alt="Avatar"
        className="relative h-auto max-h-60 w-full max-w-60 rounded-full object-cover shadow-md"
        whileHover={{ scale: 1.02, rotate: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </div>
  );
}
