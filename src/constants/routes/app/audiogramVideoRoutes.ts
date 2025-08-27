// Third-party dependencies

// Current project dependencies

const audiogramVideoRoutes: AppSectionRoutes = {
  name: "Audiogram",
  routes: {
    new: {
      label: "New Audiogram Video",
      href: () => "/videos/audiogram/new/",
      description: "Create a new audiogram video from scratch.",
      visible: true,
    },
    all: {
      label: "All Audiogram Videos",
      href: () => "/videos/audiogram/",
      description: "Explore all available audiogram videos.",
      visible: true,
    },
    preview: {
      label: "Audiogram Video Preview",
      href: (id: string) => `/videos/audiogram/preview/${id}/`,
      description: "Preview a specific audiogram video before making changes.",
      visible: false,
    },
    edit: {
      label: "Edit Audiogram Video",
      href: (id: string) => `/videos/audiogram/preview/${id}/edit`,
      description: "Edit a specific audiogram video.",
      visible: false,
    },
  },
};

export default audiogramVideoRoutes;
