# Project Setup & Entitlements

## 🎯 Goal

In this step, you’ll prepare your development environment and configure your Looker project to support embedded extensions. This includes checking out the correct Git branch, setting up the `manifest.lkml` file, and enabling the required entitlements for dashboard embedding.

## 🛠️ Instructions

### Git Checkout

To get started working on Module 1, run:
```
git checkout module1-start --force
```
To jump to the end of this module in case you run out of time, run:

```
git checkout module1-end --force
```

### Application Manifest File

The **LookML project manifest** is a special configuration file (typically named `manifest.lkml`) that defines project-wide settings, dependencies, and applications (extensions) for your Looker project.

To add an extension or application to Looker, use the `application` parameter in your `manifest.lkml` file:

```lkml
application: simple_extension {
  label: "Simple Extension"
  url: "<cloudflare-url>/bundle.js"
}
```

- Use the `url` property for development (points to your local dev server)
- Use the `file` property for production (points to a static JS file in your project)

### Enabling Entitlements

**Entitlements** are permissions that specify what capabilities your Looker extension or application is allowed to use. In order for your extension to be able to embed a dashboard, you need to add the `use_iframes` and `use_embeds` entitlements to your manifest.lkml file:

```lkml
application: simple_extension {
  label: "Simple Extension"
  url: "<serveo-url>/bundle.js"
  entitlements: {
    core_api_methods: ["me"]
    use_embeds: yes
    use_iframes: yes
  }
}
```

⭐ **Best Practices**:
- **Granting only the entitlements your extension needs** for its functionality.
- **Reviewing and updating entitlements** as your extension evolves.
- **Testing your extension** in both development (`url`) and production (`file`) modes to ensure entitlements are set correctly.


---

Learn more:

- [📘 LookML Project Manifest](./glossary.md#looker-project-manifest)
- [📘 Entitlements](./glossary.md#entitlements)

---

### ➡️ Next: [Embedding a Dashboard](2-embedding-dashboard.md) 