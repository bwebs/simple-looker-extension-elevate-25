1. open [shell editor](https://shell.cloud.google.com)
2. Click the clone repository button on the left
3. Enter the following repo and clone: https://github.com/rbob86/simple-looker-extension
4. Cmd+shift+p and Create new terminal
5. open webpack.dev.js and remove `server: {type: 'https'}`
6. run `yarn install && yarn dev`
7. open another terminal and run: `ssh -R 80:127.0.0.1:8080 serveo.net`. Copy the serveo url, you will use it for the next few steps
8. open chrome and go to `https://<serveo-url>/bundle.js` and accept the certificate 
9. open up a looker project and put this in the manifest.lkml. Make sure to replace your server url in the url field.
```
application: simple_extension {
  label: "Simple Extension"
  url: "<serveo-url>/bundle.js"
  # file: "bundle.js"
  entitlements: {
    core_api_methods: ["me", "run_inline_query"]
    navigation: yes
    use_embeds: yes
    use_iframes: yes
    new_window: yes
    new_window_external_urls: []
    local_storage: yes
    external_api_urls: []
  }
  mount_points: {
    dashboard_vis: no
    dashboard_tile: yes
    standalone: yes
  }
}
```
10. refresh your looker window and go to applications and open Simple Extension
11: :tada:
