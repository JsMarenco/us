// Third-party dependencies

// Current project dependencies

const folderNames = {
  datalake: "datalake",
  videoEmpty: {
    datalake: "datalake/videos/empty",
    public: "public/videos/empty",
  },
  dualVideo: {
    datalake: "datalake/videos/dual",
    public: "public/videos/dual",
  },
  redditVideo: {
    datalake: "datalake/videos/dual",
    public: "public/videos/dual",
  },
  audiogramVideo: {
    datalake: "datalake/videos/audiogram",
    public: "public/videos/audiogram",
  },
  temp: {
    audios: "temp/audios",
    videos: "temp/videos",
    images: "temp/images",
    extra: "temp/extra",
  },
  config: "config",
  backgrounds: {
    audios: "backgrounds/audios",
    videos: "backgrounds/videos",
    images: "backgrounds/images",
  },
  utils: "utils",
  media: {
    videos: "media/videos",
    thumbnails: "media/thumbnails",
  },
};

const filenames = {
  video: "video.mp4",
  videoThumbnail: "thumbnail.png",
  emptyVideo: "empty-video.json",
  audiogramVideo: "audiogram-video.json",
  datalake: {
    chatGptCookies: "chat-gpt-cookies.json",
    googleCookies: "google-cookies.json",
    userAgents: "user-agents.json",
  },
};

const names = {
  folders: { ...folderNames },
  files: { ...filenames },
};

export default names;
