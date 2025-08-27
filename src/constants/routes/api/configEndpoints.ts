// Third-party dependencies

// Current project dependencies

const base = "/api/configs";

const configEndpoints = {
  base,
  uploadMedia: {
    create: `${base}/uploads/media`,
    all: `${base}/uploads/media/all`,
    id: (id: string) => `${base}/uploads/media/${id}`,
  },
  system: {
    videoTmp: `${base}/system/clear/tmp/videos`,
    fileTmp: `${base}/system/clear/tmp/files`,
    voices: `${base}/system/voices`,
    media: `${base}/system/media`,
    subtitles: `${base}/system/subtitles`,
    watermark: `${base}/system/watermark`,
  },
  videos: {
    type: (t: string, i = "") => `${base}/videos/${t}/${i}`,
  },
};

export default configEndpoints;
