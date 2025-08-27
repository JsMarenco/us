// Third-party dependencies

import names from "./base";

// Current project dependencies

const BASE_PATH = `${names.folders.videoEmpty.datalake}`;

const emptyVideoPaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  backgrounds: {
    audios: (seg = "") => `${BASE_PATH}/backgrounds/audios/${seg}`,
    videos: (seg = "") => `${BASE_PATH}/backgrounds/videos/${seg}`,
  },
  public: {
    base: (seg = "") => `public/videos/empty/${seg}`,
  },
  firebase: {
    base: (seg = "") => `videos/empty/${seg}`,
    audios: (seg = "") => `videos/empty/audios/${seg}`,
    videos: (seg = "") => `videos/empty/videos/${seg}`,
    backgrounds: {
      audios: (seg = "") => `videos/empty/backgrounds/audios/${seg}`,
      videos: (seg = "") => `videos/empty/backgrounds/videos/${seg}`,
    },
  },
};

export default emptyVideoPaths;
