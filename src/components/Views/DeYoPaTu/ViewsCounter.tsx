import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";

type Props = {
  views: number;
};

export default function ViewsCounter({ views }: Props) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, views, {
      duration: 1.5,
      onUpdate: (val) => setDisplay(Math.floor(val)),
    });

    return () => controls.stop();
  }, [views]);

  return (
    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
      <AiOutlineEye /> {display}
    </span>
  );
}
