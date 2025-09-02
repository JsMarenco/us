// Third-party dependencies
import Joyride, { type Step } from "react-joyride";
import { useState, useEffect } from "react";

// Current project dependencies

export default function FireDeYoPaTuOnboarding() {
  const [run, setRun] = useState(false);
  const [joyrideStyles, setJoyrideStyles] = useState({});

  useEffect(() => {
    const firstFire = document.querySelector(".fire-container");

    if (!firstFire) return;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setJoyrideStyles({
      options: {
        zIndex: 10000,
        arrowColor: isDark ? "#FFB347" : "#FFD580",
        backgroundColor: isDark ? "#333" : "#fff",
        textColor: isDark ? "#f0f0f0" : "#333",
        overlayColor: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
      },
      tooltipContainer: {
        boxShadow: isDark
          ? "0 0 15px rgba(255,150,50,0.4)"
          : "0 0 10px rgba(0,0,0,0.2)",
      },
    });

    setRun(true);
  }, []);

  const steps: Step[] = [
    {
      target: ".fire-container:first-child",
      content:
        "Este post es reciente y tiene menos de 6 horas, por eso tiene este efecto de 'On Fire'",
      placement: "top",
    },
  ];

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      styles={joyrideStyles}
    />
  );
}
