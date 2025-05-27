1. open [shell editor](https://shell.cloud.google.com)
2. Click the clone repository button on the left
3. Enter the following repo and clone: https://github.com/bwebs/simple-looker-extension-elevate-25
4. Cmd+shift+p and Create new terminal
6. run `npm install && yarn run dev`
7. open another terminal and run: `ssh -R 80:127.0.0.1:8080 serveo.net`. Copy the serveo url, you will use it for the next few steps
8. open chrome and go to `https://<serveo-url>/bundle.js` and verify you get a response
9. open up a looker project and put this in the manifest.lkml. Make sure to replace your server url in the url field.
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
10. Refresh your looker window and go to applications and open Simple Extension
12: :tada:
