// Third-party dependencies

// Current project dependencies

/**
 * Navigation link definitions used across the site.
 *
 * Each item includes a label for display and a corresponding href for routing.
 */
const navLinks = [{ label: "Inicio", href: "/" }];

export const hamburguerNavLinks = [
  // {
  //   label: "Avatars",
  //   links: [{ label: "Todos los Avatars", href: "/avatars" }],
  // },
  {
    label: "De yo pa tu's",
    links: [
      { label: "Crear nuevo", href: "/de-yo-pa-tu/new" },
      { label: "Ver todos", href: "/de-yo-pa-tu" },
    ],
  },
  // {
  //   label: "Planes futuros",
  //   links: [
  //     { label: "Crear nuevo", href: "/future-plans/new" },
  //     { label: "Ver todos", href: "/future-plans" },
  //   ],
  // },
  {
    label: "User",
    links: [{ label: "Editar Usuario", href: "/me/edit" }],
  },
];

export default navLinks;
