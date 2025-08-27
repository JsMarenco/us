// Third-party dependencies

// Current project dependencies

const commonAppRoutes: AppSectionRoutes = {
  name: "Common",
  routes: {
    home: {
      label: "Home",
      href: () => "/",
      description: "",
      visible: true,
    },
    notFound: {
      label: "404 - Not Found",
      href: () => "/404",
      description: "",
      visible: false,
    },
  },
};

export default commonAppRoutes;
