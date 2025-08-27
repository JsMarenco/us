// Third-party dependencies

// Current project dependencies
import datalakePaths from "./datalake";
import emptyVideoPaths from "./empty";
import audiogramVideoPaths from "./audiogram";
import dualVideoPaths from "./dual";
import configPaths from "./config";
import utilsPaths from "./utils";
import redditVideoPaths from "./reddit";

const folderPaths = {
  emptyVideo: { ...emptyVideoPaths },
  audiogramVideo: { ...audiogramVideoPaths },
  datalake: { ...datalakePaths },
  dualVideo: { ...dualVideoPaths },
  redditVideo: { ...redditVideoPaths },
  config: { ...configPaths },
  utils: { ...utilsPaths },
};

export default folderPaths;
