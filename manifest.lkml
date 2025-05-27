application: simple_extension {
  label: "Simple Extension"
  url: "<serveo-url>/bundle.js"
  entitlements: {
    core_api_methods: ["me"]
    use_embeds: yes
    use_iframes: yes
  }
}