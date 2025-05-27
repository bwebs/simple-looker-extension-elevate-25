application: simple_extension {
  label: "Simple Extension"
  url: "https://localhost:8080/bundle.js"
# url: "<serveo-url>/bundle.js"
  entitlements: {
    core_api_methods: ["me"]
  }
}