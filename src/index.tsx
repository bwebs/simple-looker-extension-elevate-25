import { ComponentsProvider } from "@looker/components";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const mountApp = () => {
  const rootId = "extension-root";
  let root = document.getElementById(rootId);

  if (!root) {
    root = document.createElement("div");
    root.id = rootId;
    root.style.height = "100vh";
    root.style.display = "flex";
    document.body.style.margin = "0";
    document.body.appendChild(root);
  }

  ReactDOM.render(
    <ExtensionProvider>
      <ComponentsProvider>
        <App />
      </ComponentsProvider>
    </ExtensionProvider>,
    root
  );
};

window.addEventListener("DOMContentLoaded", mountApp);
