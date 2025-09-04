// Third-party dependencies
import { ImageResponse } from "@vercel/og";
import { createElement } from "react";
import type { User } from "@prisma/client";

// Current project dependencies
import { defaultAvatar, defaultBanner } from "../../../constants";

type Props = {
  user: User;
};

const generateUserProfileOGImage = ({ user }: Props): ImageResponse => {
  const truncatedBio = user.bio
    ? user.bio.length > 150
      ? user.bio.slice(0, 150) + "…"
      : user.bio
    : "";
  const bannerUrl = defaultBanner(user.bannerSrc, user.username, "png");
  const avatarUrl = defaultAvatar(user.avatarSrc, user.username, "png");
  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Usuario Desconocido";
  const username = user.username || "desconocido";

  const renderBanner = (bannerUrl: string) =>
    createElement("img", {
      key: "banner",
      src: bannerUrl,
      width: 1200,
      height: 630,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 1200,
        height: 630,
        objectFit: "cover",
        filter: "blur(24px) brightness(0.45)",
        zIndex: 0,
      },
    });

  const renderAvatar = (avatarUrl: string) =>
    createElement("img", {
      key: "avatar",
      src: avatarUrl,
      width: 120,
      height: 120,
      style: {
        width: 140,
        height: 140,
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid rgba(255,255,255,0.25)",
        zIndex: 1,
      },
    });

  const renderName = (fullName: string) =>
    createElement(
      "h1",
      {
        key: "name",
        style: {
          fontSize: 64,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 20,
          zIndex: 1,
        },
      },
      fullName,
    );

  const renderBio = (bio: string) =>
    createElement(
      "p",
      {
        key: "bio",
        style: {
          fontSize: 32,
          fontWeight: 400,
          color: "#e0e0e0",
          maxWidth: 900,
          lineHeight: 1.5,
          marginBottom: 36,
          textAlign: "center",
          zIndex: 1,
        },
      },
      bio,
    );

  const renderFooter = (username: string) =>
    createElement(
      "div",
      {
        key: "footer",
        style: {
          fontSize: 28,
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "rgba(42,42,42,0.85)",
          padding: "16px 28px",
          borderRadius: 18,
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
        },
      },
      `cocoton.net/u/${username}`,
    );

  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          position: "relative",
          width: 1200,
          height: 630,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#121212",
        },
      },
      [
        renderBanner(bannerUrl),
        renderAvatar(avatarUrl),
        renderName(fullName),
        renderBio(truncatedBio),
        renderFooter(username),
      ],
    ),
    { width: 1200, height: 630 },
  );
};

export default generateUserProfileOGImage;
