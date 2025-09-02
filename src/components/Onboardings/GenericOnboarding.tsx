/* eslint-disable prettier/prettier */
// Third-party dependencies
import Joyride, { type Step } from "react-joyride";
import { useState, useEffect } from "react";
import { tw } from "twind";

// Current project dependencies

interface GenericOnboardingProps {
  steps: Step[];
  storageKey: string;
}

export default function GenericOnboarding({
  steps,
  storageKey,
}: GenericOnboardingProps) {
  const [run, setRun] = useState(false);
  const [joyrideStyles, setJoyrideStyles] = useState({});

  useEffect(() => {
    const hasSeen = localStorage.getItem(storageKey);

    if (hasSeen) return;

    const targetSelector = typeof steps[0]?.target === "string" ? steps[0]?.target : undefined;
    const container = targetSelector ? document.querySelector(targetSelector) : null;

    if (!container) return;

    setJoyrideStyles({
      tooltipContainer: {
        borderRadius: "1rem",
        padding: "1.25rem",
        fontSize: "1rem",
        boxShadow: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "0 12px 40px rgba(0,0,0,0.35)"
          : "0 12px 40px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "rgba(40, 40, 40, 0.75)"
          : "rgba(255, 255, 255, 0.75)",
        border: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "1px solid rgba(255, 255, 255, 0.12)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        color: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "#eeeeee"
          : "#111111",
      },
      overlay: {
        backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "rgba(0,0,0,0.55)"
          : "rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
      },
    });

    setRun(true);
  }, [steps, storageKey]);

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      styles={joyrideStyles}
      locale={{
        back: "Atrás",
        close: "Cerrar",
        last: "Terminar",
        next: "Siguiente",
        skip: "Saltar",
      }}
      callback={(data) => {
        const { status } = data;

        if (["finished", "skipped"].includes(status)) {
          localStorage.setItem(storageKey, "true");
          setRun(false);
        }
      }}
    />
  );
}
