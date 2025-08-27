// Third-party dependencies

// Current project dependencies
import aiEndpoints from "./aiEndpoints";
import configEndpoints from "./configEndpoints";
import generateEndpoints from "./generateEndpoints";
import utilsEndpoints from "./utilsEndpoints";
import videosEndpoints from "./videosEndpoints";

/**
 * All the api routes
 */
const apiRoutes = {
  videos: {
    ...videosEndpoints,
  },
  utils: {
    ...utilsEndpoints,
  },
  generate: {
    ...generateEndpoints,
  },
  config: {
    ...configEndpoints,
  },
  ai: {
    ...aiEndpoints,
  },
};

export default apiRoutes;
