// Third-party dependencies

// Current project dependencies

const dualVideoAppRoutes: AppSectionRoutes = {
  name: "Dual",
  routes: {
    new: {
      label: "New Dual Video",
      href: () => "/videos/dual/new/",
      description: "Create a dual video.",
      visible: true,
    },
    all: {
      label: "All Dual Videos",
      href: () => "/videos/dual/",
      description: "Browse through all available dual videos.",
      visible: true,
    },
    preview: {
      label: "Dual Video Preview",
      href: (id: string) => `/videos/dual/preview/${id}/`,
      description: "Preview a specific dual video before making changes.",
      visible: false,
    },
    edit: {
      label: "Edit Dual Video",
      href: (id: string) => `/videos/dual/preview/${id}/edit`,
      description: "Edit a specific dual video.",
      visible: false,
    },
  },
};

export default dualVideoAppRoutes;
