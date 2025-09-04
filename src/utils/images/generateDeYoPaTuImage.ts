// Third-party dependencies
import { ImageResponse } from "@vercel/og";
import type { DeYoPaTu, User } from "@prisma/client";
import { createElement } from "react";

// Current project dependencies

type Props = {
  deYoPaTu: DeYoPaTu;
  creator: User;
};

const generateDeYoPaTuImage = ({ deYoPaTu, creator }: Props) => {
  const estimateWrappedLines = (text: string, charsPerLine: number) => {
    if (!text) return 0;

    const lines = text.split("\n");

    return lines.reduce((sum, line) => {
      const trimmed = line.trim();

      if (trimmed.length === 0) {
        return sum;
      }

      return sum + Math.ceil(trimmed.length / charsPerLine);
    }, 0);
  };

  const calculateHeight = (deYoPaTu: DeYoPaTu) => {
    const titleLines = deYoPaTu.title
      ? estimateWrappedLines(deYoPaTu.title, 200)
      : 0;
    const titleHeight = titleLines > 0 ? 72 * titleLines + 30 : 0;
    const contentText = (deYoPaTu.content || "").trim();
    const contentWrappedLines = estimateWrappedLines(contentText, 200);
    const contentRealLines = contentText
      .split("\n")
      .filter((l) => l.trim().length > 0).length;
    const contentHeight =
      contentWrappedLines > 0
        ? 34 * contentWrappedLines + 12 * Math.max(0, contentRealLines - 1)
        : 0;

    const footerHeight = 32 + 40 + 16 + 16;
    const verticalPadding = 45 * 2;

    return titleHeight + contentHeight + footerHeight + verticalPadding;
  };

  const formatContent = (text: string) => {
    const lines = text.trim().split("\n");

    return lines.map((line, i) =>
      createElement(
        "p",
        {
          key: i,
          style: {
            margin: `0 0 ${i === lines.length - 1 ? 0 : 12}px 0`,
            padding: "0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontSize: 32,
            lineHeight: "34px",
            color: "#e0e0e0",
            fontWeight: 400,
          },
        },
        line,
      ),
    );
  };

  const renderTitle = () =>
    deYoPaTu.title
      ? createElement(
          "h1",
          {
            key: "title",
            style: {
              fontSize: 60,
              lineHeight: "72px",
              fontWeight: 700,
              margin: "0 0 30px 0",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
          },
          deYoPaTu.title,
        )
      : null;

  const renderContent = () =>
    createElement(
      "div",
      {
        key: "content-wrapper",
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: 32,
          lineHeight: "34px",
          color: "#e0e0e0",
          fontWeight: 400,
          textAlign: "center",
          margin: 0,
          padding: 0,
        },
      },
      formatContent(deYoPaTu.content || ""),
    );

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
          lineHeight: "32px",
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
          backgroundColor: "#121212",
          fontFamily: "Inter, sans-serif",
        },
      },
      [renderTitle(), renderContent(), renderFooter()].filter(Boolean),
    ),
    {
      width: 1200,
      height: calculateHeight(deYoPaTu),
    },
  );
};

export default generateDeYoPaTuImage;
