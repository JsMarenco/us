// Third-party dependencies
import { motion } from "framer-motion";

// Current project dependencies
import AnimatedAvatar from "./AnimatedAvatar";

interface AvatarCardProps {
  imageSrcOne: string;
  imageSrcTwo: string;
  caption?: string;
  takenAt: string;
}

export default function AvatarsCard({
  imageSrcOne,
  imageSrcTwo,
  caption,
  takenAt,
}: AvatarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-3 rounded-xl border border-gray-500/80 p-4 text-gray-800 dark:text-gray-100"
    >
      <span className="text-sm text-gray-500 md:text-base dark:text-gray-400">
        {takenAt}
      </span>

      <div className="flex items-center justify-center gap-4">
        <AnimatedAvatar src={imageSrcOne} />
        <div className="h-1 w-8 bg-gray-400 dark:bg-gray-600"></div>
        <AnimatedAvatar src={imageSrcTwo} />
      </div>

      {caption && (
        <p className="text-center text-sm text-gray-800 italic md:text-base dark:text-gray-100">
          &ldquo;{caption}&rdquo;
        </p>
      )}
    </motion.div>
  );
}
