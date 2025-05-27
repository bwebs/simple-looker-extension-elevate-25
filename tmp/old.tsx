const dashboardRef = useCallback((el: HTMLDivElement) => {
  if (el && !el.children.length) {
    const embed_sdk = getEmbedSDK();
    embed_sdk.init(extension_sdk.lookerHostData?.hostUrl!);
    embed_sdk
      .createDashboardWithId("thelook::brand_lookup")
      .appendTo(el)
      .on("page:properties:changed", (event: any) => {
        if (event && event.height) {
          setHeight(event.height);
        }
      })
      .withParams({
        _theme: JSON.stringify(_THEME),
        ...FILTER_PARAMS,
      })
      .build()
      .connect()
      .then((dashboard) => {
        setDashboard(dashboard);
      })
      .catch((error: any) => {
        // Optionally handle error
        // eslint-disable-next-line no-console
        console.error("Error embedding dashboard:", error);
      });
  }
}, []);
