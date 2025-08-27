// Third-party dependencies

// Current project dependencies
import names from "./base";

const BASE_PATH = `${names.folders.config}`;

const configPaths = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  voices: {
    base: `${BASE_PATH}/voices`,
    audios: `${BASE_PATH}/voices/audios`,
  },
  media: {
    videos: `${BASE_PATH}/uploads/media/videos`,
    audios: `${BASE_PATH}/uploads/media/audios`,
    images: `${BASE_PATH}/uploads/media/images`,
    extra: `${BASE_PATH}/uploads/media/extra`,
  },
};

export default configPaths;
