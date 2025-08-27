// Third-party dependencies

// Current project dependencies
import names from "./base";

const BASE_PATH = `${names.folders.utils}`;

const utilsPath = {
  base: (seg = "") => `${BASE_PATH}/${seg}`,
  convertVideoToMp3: `${BASE_PATH}/convert/tmp`,
};

export default utilsPath;
