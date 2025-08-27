// Third-party dependencies

// Current project dependencies

const emptyVideoAppRoutes: AppSectionRoutes = {
  name: "Empty",
  routes: {
    new: {
      label: "New Video",
      href: () => "/videos/empty/new/",
      description: "Create a new video from scratch.",
      visible: true,
    },
    all: {
      label: "All Videos",
      href: () => "/videos/empty/",
      description: "Browse all videos available.",
      visible: true,
    },
    preview: {
      label: "Video Preview",
      href: (id: string) => `/videos/empty/preview/${id}/`,
      description: "Preview a specific video before editing or sharing.",
      visible: false,
    },
    edit: {
      label: "Edit Video",
      href: (id: string) => `/videos/empty/preview/${id}/edit/`,
      description: "Edit a specific video.",
      visible: false,
    },
    nasaPhotoDay: {
      label: "NASA Photo of the Day",
      href: () => "/videos/empty/new/nasa/photo-day/",
      description: "Create a new video using NASA's photo of the day.",
      visible: true,
    },
  },
};

export default emptyVideoAppRoutes;
