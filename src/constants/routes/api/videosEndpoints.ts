// Third-party dependencies
import { VideoCategory, WebsitePlatform } from "@prisma/client";

// Current project dependencies

const base = "/api/videos";

const videosEndpoints = {
  thumbnail: {
    renderAll: `${base}/renders/thumbnail/`,
  },
  empty: {
    create: `${base}/empty`,
    all: `${base}/empty/all`,
    id: (id: string) => `${base}/empty/${id}`,
    nasa: {
      photoDay: `${base}/empty/nasa/photo-day`,
    },
    ai: {
      chatGpt: `${base}/empty/ai/chatgpt`,
    },
    render: (id: string) => `${base}/single-render/empty/${id}`,
    renderAll: `${base}/renders/empty/`,
  },
  reddit: {
    scrap: `${base}/reddit/scrap`,
    create: `${base}/reddit`,
    all: `${base}/reddit/all`,
    id: (id: string) => `${base}/reddit/${id}`,
    render: (id: string) => `${base}/single-render/reddit/${id}`,
    renderAll: `${base}/renders/reddit/`,
    combineAudio: `${base}/reddit/combine-audio`,
  },
  audiogram: {
    id: (id: string) => `${base}/audiogram/${id}`,
    all: `${base}/audiogram/all`,
    create: `${base}/audiogram`,
    render: (id: string) => `${base}/single-render/audiogram/${id}`,
    renderAll: `${base}/renders/audiogram/`,
  },
  dual: {
    create: `${base}/dual`,
    id: (id: string) => `${base}/dual/${id}`,
    all: `${base}/dual/all`,
    render: (id: string) => `${base}/single-render/dual/${id}`,
    renderAll: `${base}/renders/dual/`,
  },
  defaults: {
    empty: `${base}/defaults/empty`,
    reddit: `${base}/defaults/reddit`,
    audiogram: `${base}/defaults/audiogram`,
    dual: `${base}/defaults/dual`,
    thumbnail: `${base}/defaults/thumbnail`,
  },
  upload: {
    one: (i: string, p: WebsitePlatform) => `${base}/upload/${p}/${i}`,
    byVideo: (i: string) => `${base}/upload/all/platforms/${i}`,
    byCategory: (c: VideoCategory) => `${base}/upload/all/categories/${c}`,
  },
  download: {
    videoFile: (id: string, filename = "") =>
      `${base}/download/${id}${filename ? `?filename=${encodeURIComponent(filename)}` : ""}`,

    thumbnailFile: (id: string, filename = "") =>
      `${base}/download/${id}/thumbnail${filename ? `?filename=${encodeURIComponent(filename)}` : ""}`,
  },
  metadata: {
    id: (i: string) => `${base}/metadata/${i}`,
  },
  reset: {
    reRender: (i: string) => `${base}/re-renders/${i}`,
    backgrounds: (i: string) => `${base}/backgrounds/${i}`,
  },
};

export default videosEndpoints;
