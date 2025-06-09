import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const isDev = process.env.NODE_ENV === "development";

const config: Config = {
  title: "Looker Extension Elevate 25",
  tagline: "Extension Framework Hands On Lab",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  trailingSlash: false,

  // Set the production url of your site here
  url: isDev ? "http://localhost:3000" : "https://bwebs.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: isDev ? "/" : "/simple-looker-extension-elevate-25/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bwebs", // Usually your GitHub org/user name.
  projectName: "bwebs.github.io", // Usually your repo name.

  onBrokenLinks: isDev ? "warn" : "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    isDev
      ? "/js/code-block-buttons.js"
      : "https://bwebs.github.io/simple-looker-extension-elevate-25/js/code-block-buttons.js",
  ],
  stylesheets: [
    isDev
      ? "/css/code-block-buttons.css"
      : "https://bwebs.github.io/simple-looker-extension-elevate-25/css/code-block-buttons.css",
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Looker Extension Elevate 25",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Hands On Lab",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
