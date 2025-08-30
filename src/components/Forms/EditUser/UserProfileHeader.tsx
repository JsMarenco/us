// Third-party dependencies
import { motion } from "framer-motion";
import type { User } from "@prisma/client";

// Current project dependencies
import { defaultBanner, defaultAvatar } from "../../../constants";
import type { ReactNode } from "react";

interface UserProfileProps {
  user: {
    username: string;
    avatarSrc: string | null;
    bannerSrc: string | null;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
  };
  children?: ReactNode;
}

export default function UserProfileHeader({
  user,
  children,
}: UserProfileProps) {
  const bannerSrc = defaultBanner(user.bannerSrc, user.username);
  const avatarSrc = defaultAvatar(user.avatarSrc, user.username);

  const { username, firstName, lastName, bio } = user;

  return (
    <motion.section
      className="relative w-full overflow-hidden rounded-xl bg-white/10 shadow-xl backdrop-blur-md dark:bg-gray-800/40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-52 w-full overflow-hidden rounded-xl">
        <motion.img
          alt="Banner"
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
          src={bannerSrc}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="relative -mt-16 flex flex-col items-center px-6 pb-4">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            alt={username}
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            src={avatarSrc}
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-white/30" />
        </motion.div>

        <h1 className="mt-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {firstName || lastName
            ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
            : username}
        </h1>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
          @{username}
        </p>

        {bio && (
          <p className="mt-3 max-w-xl text-center text-gray-800 dark:text-gray-100">
            {bio}
          </p>
        )}
      </div>

      {children}
    </motion.section>
  );
}
