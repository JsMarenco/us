// Third-party dependencies
import { useState, useRef, useEffect } from "react";

// Current project dependencies
import cn from "../../utils/cn";

const Select = ({
  value,
  onChange,
  items,
}: {
  items: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = items.find((c) => c.value === value)?.label || "";

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl bg-white/20 px-4 py-3 text-gray-800 shadow-lg ring-1 ring-white/20 backdrop-blur-md transition-all focus:ring-2 focus:ring-green-400 dark:bg-gray-800/30 dark:text-gray-100 dark:ring-white/10"
      >
        {selectedLabel}
        <span className="ml-2 text-gray-500 dark:text-gray-300">▼</span>
      </button>

      {open && (
        <ul className="scrollbar absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white/20 px-2 py-2 shadow-lg ring-1 ring-white/20 backdrop-blur-md dark:bg-gray-800/30 dark:ring-white/10">
          {items.map(({ value: val, label }) => (
            <li
              key={val}
              onClick={() => {
                onChange(val);
                setOpen(false);
              }}
              className={cn(
                "my-2 cursor-pointer rounded-lg px-4 py-2 text-gray-800 transition-all hover:bg-white/30 dark:text-gray-100 dark:hover:bg-gray-700/40",
                val === value &&
                  "bg-white/40 font-semibold dark:bg-gray-700/50",
              )}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
