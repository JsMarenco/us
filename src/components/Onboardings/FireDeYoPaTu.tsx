// Third-party dependencies
import { type Step } from "react-joyride";

// Current project dependencies
import GenericOnboarding from "./GenericOnboarding";

export default function FireDeYoPaTuOnboarding() {
  const steps: Step[] = [
    {
      target: ".fire-container:first-child",
      content:
        "Este post es reciente y tiene menos de 6 horas, por eso tiene este efecto de 'On Fire'",
      placement: "top",
    },
  ];

  return (
    <GenericOnboarding
      steps={steps}
      storageKey="fire-deyopatu-onboarding-seen"
    />
  );
}
