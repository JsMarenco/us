// Third-party dependencies

// Current project dependencies

const redditVideoAppRoutes: AppSectionRoutes = {
  name: "Reddit",
  routes: {
    new: {
      label: "New Reddit Video",
      href: () => "/videos/reddit/new/",
      description: "Create a new Reddit video",
      visible: true,
    },
    all: {
      label: "All Reddit Videos",
      href: () => "/videos/reddit/",
      description: "View all Reddit videos",
      visible: true,
    },
    preview: {
      label: "Reddit Video Preview",
      href: (id: string) => `/videos/reddit/preview/${id}/`,
      description: "Preview a specific Reddit video",
      visible: false,
    },
    edit: {
      label: "Edit Video",
      href: (id: string) => `/videos/reddit/preview/${id}/edit`,
      description: "",
      visible: false,
    },
  },
};

export default redditVideoAppRoutes;
