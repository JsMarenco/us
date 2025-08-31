// Third-party dependencies

// Current project dependencies

/**
 * Navigation link definitions used across the site.
 *
 * Each item includes a label for display and a corresponding href for routing.
 */
const navLinks = [{ label: "Inicio", href: "/" }];

export const hamburguerNavLinks = ({ username }: { username?: string }) => {
  const links: { label: string; links: { label: string; href: string }[] }[] =
    [];

  if (username) {
    links.push({
      label: "De yo pa tu's",
      links: [
        { label: "Crear nuevo", href: "/de-yo-pa-tu/new" },
        { label: "Ver todos", href: "/de-yo-pa-tu" },
      ],
    });
  } else {
    links.push({
      label: "De yo pa tu's",
      links: [{ label: "Ver todos", href: "/de-yo-pa-tu" }],
    });
  }

  const personalLinks = [];

  if (username)
    personalLinks.push({ label: "Mi Perfil", href: `/u/${username}` });
  if (username)
    personalLinks.push({ label: "Editar Usuario", href: "/me/edit" });

  personalLinks.push({ label: "Usuairos", href: "/users" });

  links.push({
    label: "Personal",
    links: personalLinks,
  });

  return links;
};

export default navLinks;
