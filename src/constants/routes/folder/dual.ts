// Third-party dependencies

import names from "./base";

// Current project dependencies

const BASE_PATH = `${names.folders.dualVideo.datalake}`;

const dualVideoPaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  backgrounds: {
    audios: (seg = "") => `${BASE_PATH}/backgrounds/audios/${seg}`,
    videos: (seg = "") => `${BASE_PATH}/backgrounds/videos/${seg}`,
  },
  public: {
    base: (seg = "") => `public/videos/reaction/${seg}`,
  },
  firebase: {
    base: (seg = "") => `videos/dual/${seg}`,
    audios: (seg = "") => `videos/dual/audios/${seg}`,
    videos: (seg = "") => `videos/dual/videos/${seg}`,
    backgrounds: {
      audios: (seg = "") => `videos/dual/backgrounds/audios/${seg}`,
      videos: (seg = "") => `videos/dual/backgrounds/videos/${seg}`,
    },
  },
};

export default dualVideoPaths;
