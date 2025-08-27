// Third-party dependencies

import audiogramVideoRoutes from "./audiogramVideoRoutes";
import commonAppRoutes from "./commonRoutes";
import configRoutes from "./configRoutes";
import dualVideoAppRoutes from "./dualVideoRoutes";
import emptyVideoAppRoutes from "./emptyVideoRoutes";
import redditVideoAppRoutes from "./redditVideoRoutes";
import renderRoutes from "./renderRoutes";
import utilsRoutes from "./utilsRoutes";

// Current project dependencies

/**
 * All app routes
 */
const appRoutes: AppRoutes = {
  videos: {
    empty: emptyVideoAppRoutes,
    audiogram: audiogramVideoRoutes,
    dual: dualVideoAppRoutes,
    reddit: redditVideoAppRoutes,
  },
  common: commonAppRoutes,
  utils: utilsRoutes,
  config: configRoutes,
  render: renderRoutes,
};

export default appRoutes;
