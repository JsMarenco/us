// Third-party dependencies

// Current project dependencies
import apiRoutes from "../api";

const renderRoutes: AppSectionRoutes = {
  name: "Render",
  routes: {
    empty: {
      label: "Empty Videos",
      href: () => apiRoutes.videos.empty.renderAll,
      description: "Render the dataset for empty videos.",
      visible: true,
    },
    audiogram: {
      label: "Audiogram Videos",
      href: () => apiRoutes.videos.audiogram.renderAll,
      description: "Render the dataset for audiogram videos.",
      visible: true,
    },
    dual: {
      label: "Dual Videos",
      href: () => apiRoutes.videos.dual.renderAll,
      description: "Render the dataset for dual videos.",
      visible: true,
    },
    reddit: {
      label: "Reddit Videos",
      href: () => apiRoutes.videos.reddit.renderAll,
      description: "Render the dataset for reddit videos.",
      visible: true,
    },
    videoThumbnails: {
      label: "Video Thumbnails",
      href: () => apiRoutes.videos.thumbnail.renderAll,
      description: "Render thumbnails for videos missing one.",
      visible: true,
    },
  },
};

export default renderRoutes;
