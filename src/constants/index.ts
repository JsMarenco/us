// Third-party dependencies

// Current project dependencies

export const TOKEN_NAME = import.meta.env.TOKEN_NAME || "token";

/**
 * Returns a banner URL. If the provided URL is empty or invalid,
 * it generates a default banner URL based on the username.
 */
export const defaultBanner = (
  url: string | null | undefined,
  username: string,
  format: "png" | "svg" = "svg",
) => {
  if (!url || url.trim() === "") {
    return `https://api.dicebear.com/9.x/shapes/${format}?seed=${username}`;
  }

  return url;
};

/**
 * Returns an avatar URL. If the provided URL is empty or invalid,
 * it generates a default avatar URL based on the username.
 */
export const defaultAvatar = (
  url: string | null | undefined,
  username: string,
  format: "png" | "svg" = "svg",
) => {
  if (!url || url.trim() === "") {
    return `https://api.dicebear.com/9.x/pixel-art-neutral/${format}?seed=${username}`;
  }

  return url;
};
