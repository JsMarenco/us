// Third-party dependencies

// Current project dependencies

const configRoutes: AppSectionRoutes = {
  name: "Configuration",
  routes: {
    uploadMedia: {
      label: "Upload Media",
      href: () => "/configuration/uploads/media/",
      description: "Upload media to be used in other video content",
      visible: true,
    },
    system: {
      label: "System",
      href: () => "/configuration/system/",
      description: "System settings and configurations",
      visible: true,
    },
    reddit: {
      label: "Reddit",
      href: () => "/configuration/videos/reddit/",
      description: "Reddit video configurations",
      visible: true,
    },
  },
};

export default configRoutes;
