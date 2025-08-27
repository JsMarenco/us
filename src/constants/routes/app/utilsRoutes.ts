// Third-party dependencies

// Current project dependencies

const utilsRoutes: AppSectionRoutes = {
  name: "Utilities",
  routes: {
    usernameChecker: {
      label: "Username Checker",
      href: () => "/utils/username-checker/",
      description: "Check the availability of a username",
      visible: true,
    },
    converter: {
      label: "Convert Video and Audio to MP3",
      href: () => "/utils/converter/",
      description:
        "Convert video files (MP4) and audio files of any format to MP3 format",
      visible: true,
    },
    messages: {
      label: "System Notifications",
      href: () => "/utils/system/messages/",
      description: "Review and oversee system notifications and message logs.",
      visible: false,
    },
    uploadOne: {
      label: "Upload Video Manually",
      href: (i: string) => `/videos/uploads/manually/${i}`,
      description:
        "Manually upload a video and select multiple platforms for publishing.",
      visible: false,
    },
    uploadAll: {
      label: "Upload to All Platforms",
      href: (i: string) => `/videos/uploads/all/${i}`,
      description:
        "Automatically upload the video to all configured platforms.",
      visible: false,
    },
  },
};

export default utilsRoutes;
