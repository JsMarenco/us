// Third-party dependencies

import names from "./base";

// Current project dependencies

const BASE_PATH = `${names.folders.datalake}`;

const datalakePaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  backgrounds: {
    audios: (seg = "") => `${BASE_PATH}/assets/backgrounds/audios/${seg}`,
    videos: (seg = "") => `${BASE_PATH}/assets/backgrounds/videos/${seg}`,
  },
  cookies: (seg = "") => `${BASE_PATH}/assets/cookies/${seg}`,
  extra: (seg = "") => `${BASE_PATH}/assets/extra/${seg}`,
};

export default datalakePaths;
