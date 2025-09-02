/* eslint-disable prettier/prettier */
// Third-party dependencies
import Joyride, { type Step } from "react-joyride";
import { useState, useEffect } from "react";

// Current project dependencies
import GenericOnboarding from "./GenericOnboarding";

export default function DeYoPaTuFormOnboarding() {
    const steps: Step[] = [
    {
      target: ".form-container",
      content:
        "¡Bienvenido! Aquí puedes crear o editar tu DeYoPaTu. Vamos a repasar los pasos importantes.",
      placement: "auto",
    },
    {
      target: "input[type='file']",
      content:
        "Primero selecciona una imagen desde tu dispositivo. Esta será la portada de tu DeYoPaTu.",
      placement: "bottom",
    },
    {
      target: ".relative.flex.max-h-72",
      content:
        "Una vez seleccionada, aquí verás un preview de la imagen antes de subirla al servidor.",
      placement: "bottom",
    },
    {
      target: ".image-loaded",
      content:
        "¡Perfecto! Si la imagen se cargó correctamente, el botón te mostrará que todo está listo.",
      placement: "bottom",
    },
    {
      target: ".select-image",
      content:
        "Si quieres cambiar la imagen, haz click aquí para seleccionar otra antes de subirla.",
      placement: "bottom",
    },
    {
      target: ".upload-image",
      content:
        "Cuando estés listo, pulsa 'Subir imagen' para guardarla en el servidor. Espera a que termine el proceso.",
      placement: "bottom",
    },
    {
      target: ".cancel-upload",
      content:
        "Si cambias de idea, haz click en 'Cancelar' para eliminar la imagen seleccionada y empezar de nuevo.",
      placement: "bottom",
    },
    {
      target: "input[name=\"title\"]",
      content:
        "Agrega un título opcional para tu DeYoPaTu. No es obligatorio, pero ayuda a destacar tu post.",
      placement: "bottom",
    },
    {
      target: "textarea[name=\"content\"]",
      content:
        "Aquí escribe tu contenido principal. Expresa tus ideas, sentimientos o poemas como quieras.",
      placement: "bottom",
    },
    {
      target: "input[name=\"spotifyEmbedTrackSrc\"]",
      content:
        "Si quieres, puedes pegar un embed de Spotify o un link de canción para acompañar tu DeYoPaTu.",
      placement: "bottom",
    },
    {
      target: ".anonymity-select",
      content:
        "Por último, elige si quieres publicar como anónimo o con tu nombre. ¡Tu decisión!",
      placement: "bottom",
    },
  ];

  return (
    <GenericOnboarding
      steps={steps}
      storageKey="deyopatu-form-onboarding-seen"
    />
  );
}
