// Third-party dependencies

import names from "./base";

// Current project dependencies

const BASE_PATH = `${names.folders.redditVideo.datalake}`;

const redditVideoPaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  backgrounds: {
    audios: (seg = "") => `${BASE_PATH}/backgrounds/audios/${seg}`,
    videos: (seg = "") => `${BASE_PATH}/backgrounds/videos/${seg}`,
  },
  public: {
    base: (seg = "") => `public/videos/reaction/${seg}`,
  },
  firebase: {
    base: (seg = "") => `videos/reddit/${seg}`,
    audios: (seg = "") => `videos/reddit/audios/${seg}`,
    videos: (seg = "") => `videos/reddit/videos/${seg}`,
    backgrounds: {
      audios: (seg = "") => `videos/reddit/backgrounds/audios/${seg}`,
      videos: (seg = "") => `videos/reddit/backgrounds/videos/${seg}`,
    },
  },
};

export default redditVideoPaths;
