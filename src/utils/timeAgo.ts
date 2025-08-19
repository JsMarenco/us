// Third-party dependencies

// Current project dependencies

const timeAgo = (date: string | Date) => {
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = (past.getTime() - now.getTime()) / 1000;

  const intervals = [
    { seconds: 31536000, unit: "year" as const },
    { seconds: 2592000, unit: "month" as const },
    { seconds: 604800, unit: "week" as const },
    { seconds: 86400, unit: "day" as const },
    { seconds: 3600, unit: "hour" as const },
    { seconds: 60, unit: "minute" as const },
    { seconds: 1, unit: "second" as const },
  ];

  const absDiff = Math.abs(diffInSeconds);

  for (const interval of intervals) {
    if (absDiff >= interval.seconds || interval.unit === "second") {
      const value = Math.round(diffInSeconds / interval.seconds);

      return rtf.format(value, interval.unit);
    }
  }

  return "";
};

export default timeAgo;
