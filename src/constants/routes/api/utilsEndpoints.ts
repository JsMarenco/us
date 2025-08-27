// Third-party dependencies

// Current project dependencies

const base = "/api/utils";

const utilsEndpoints = {
  videos: {
    duration: `${base}/videos/duration`,
    convert: {
      toMp3: `${base}/videos/converter/mp3`,
    },
    randomBackgrounds: `${base}/videos/backgrounds`,
  },
  audios: {
    create: `${base}/audios`,
    duration: `${base}/audios/duration`,
    convert: {
      toMp3: `${base}/audios/converter/mp3`,
    },
  },
  notifications: {
    telegram: `${base}/notifications/telegram/message`,
  },
  reports: {
    performance: `${base}/reports/performance`,
  },
  scrapping: {
    createSession: `${base}/scrapping/create-session`,
    cookies: {
      all: `${base}/scrapping/cookies/all`,
      id: (i: string) => `${base}/scrapping/cookies/${i}`,
    },
    uploadMedia: `${base}/scrapping/upload/media`,
  },
  linkedin: {
    login: `${base}/scrapping/linkedin/login`,
    jobs: `${base}/scrapping/linkedin/jobs`,
  },
};

export default utilsEndpoints;
