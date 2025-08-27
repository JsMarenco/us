// Third-party dependencies

import names from "./base";

// Current project dependencies

const BASE_PATH = `${names.folders.videoEmpty.datalake}`;

const audiogramVideoPaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  public: {
    base: (seg = "") => `public/videos/audiogram/${seg}`,
  },
  firebase: {
    base: (seg = "") => `videos/audiogram/${seg}`,
    audios: (seg = "") => `videos/audiogram/audios/${seg}`,
    videos: (seg = "") => `videos/audiogram/videos/${seg}`,
    backgrounds: {
      audios: (seg = "") => `videos/audiogram/backgrounds/audios/${seg}`,
      videos: (seg = "") => `videos/audiogram/backgrounds/videos/${seg}`,
      images: (seg = "") => `videos/audiogram/backgrounds/images/${seg}`,
    },
  },
};

export default audiogramVideoPaths;
