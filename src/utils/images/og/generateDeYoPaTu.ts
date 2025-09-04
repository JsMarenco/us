// Third-party dependencies
import { ImageResponse } from "@vercel/og";
import type { DeYoPaTu, User } from "@prisma/client";
import { createElement } from "react";

// Current project dependencies

type Props = {
  deYoPaTu: DeYoPaTu;
  creator: User;
};

const generateDeYoPaTuOgImage = ({
  deYoPaTu,
  creator,
}: Props): ImageResponse => {
  const formatContent = (text: string) => {
    return text
      .trim()
      .split("\n")
      .map((line, i) =>
        createElement(
          "p",
          {
            key: i,
            style: {
              margin: "0 0 12px 0",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          line,
        ),
      );
  };

  const renderTitle = () => {
    if (!deYoPaTu.title) return null;
    return createElement(
      "h1",
      {
        key: "title",
        style: {
          fontSize: 60,
          fontWeight: 700,
          marginBottom: "30px",
          color: "#ffffff",
          lineHeight: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      deYoPaTu.title,
    );
  };

  const renderContent = () => {
    return createElement(
      "div",
      {
        key: "content-wrapper",
        style: {
          position: "relative",
          flexGrow: 0,
          maxHeight: deYoPaTu.title ? 310 : 440,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      },
      [
        createElement(
          "div",
          {
            key: "content",
            style: {
              display: "flex",
              flexDirection: "column",
              fontSize: 32,
              lineHeight: 1.3,
              color: "#e0e0e0",
              fontWeight: 400,
              textAlign: "center",
            },
          },
          formatContent(deYoPaTu.content || ""),
        ),
        createElement("div", {
          key: "shadow",
          style: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 60,
            background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)",
          },
        }),
      ],
    );
  };

  const renderFooter = () => {
    const authorName = deYoPaTu.isAnonymous
      ? "Autor Anónimo"
      : creator
        ? `${creator.firstName} ${creator.lastName}`.trim()
        : "Autor desconocido";

    const username = creator?.username ? `${creator.username}` : "";
    const host = "cocoton.net";
    const url = deYoPaTu.isAnonymous ? host : `${host}/u/${username}`;

    return createElement(
      "div",
      {
        key: "footer",
        style: {
          marginTop: "40px",
          fontSize: 26,
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#2a2a2a",
          padding: "16px 24px",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        },
      },
      [
        createElement("span", { key: "author" }, authorName),
        createElement("span", { key: "username" }, url),
      ],
    );
  };

  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "45px",
          width: "1200px",
          height: "630px",
          backgroundColor: "#121212",
          fontFamily: "Inter, sans-serif",
        },
      },
      [renderTitle(), renderContent(), renderFooter()].filter(Boolean),
    ),
    { width: 1200, height: 630 },
  );
};

export default generateDeYoPaTuOgImage;
