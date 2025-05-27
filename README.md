1. Open [shell editor](https://shell.cloud.google.com). If you haven't used this before, follow the tutorial or click Mark Done. If you have a cloudshell` open at the bottom, you can close that for now.
2. Click the file button on the left sidebar (Explorer)
3. Click the clone repository button
4. Enter the following repo and clone: `https://github.com/bwebs/simple-looker-extension-elevate-25`. You can keep it in the default folder. When asked, click Open or Open in New Window 
5. Cmd+shift+p (alternatively click the box in the top and center of the screen, click Show and Run Commands > ) and seearch and select `Terminal: Create New Terminal`
6. Run `npm install && npm run dev`
7. Open another terminal using the same command (or press the + button on the top right of the terminal section) and run: `curl -s https://cdn.lkr.dev/scripts/tunnel.sh | sh` to start a cloudflare tunnel. Once complete, scroll up and find the url in the box.
8. Open chrome and visit `https://<tunnel-url>/bundle.js` 
9. Open up a looker project from a demo instance like [demoeast](https://demoeast.cloud.looker.com), [demowest](https://demowest.cloud.looker.com), or [demoemea](https://demoemea.cloud.looker.com) and put this in the manifest.lkml. Make sure to replace your server url in the url field.
10. 
```
application: simple_extension {
  label: "Simple Extension"
  url: "<serveo-url>/bundle.js"
  # file: "bundle.js"
  entitlements: {
    core_api_methods: ["me"]
  }
}
```

11.   Refresh your looker window and go to applications and open Simple Extension
12: :tada:
