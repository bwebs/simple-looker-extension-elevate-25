import { Box } from "@looker/components";
import { getEmbedSDK, ILookerEmbedDashboard } from "@looker/embed-sdk";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useExtensionSdk from "./hooks/useExtensionSdk";

const BRAND_FIELD = "Brand Name";
const _THEME = {
  background_color: "transparent",
};
const FILTER_PARAMS = {
  Date: "30 days ago for 30 days",
};
const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

const Dashboard: React.FC<{ selected: string | undefined }> = ({
  selected,
}) => {
  const [dashboard, setDashboard] = useState<ILookerEmbedDashboard>();
  const extension_sdk = useExtensionSdk();
  const [height, setHeight] = useState(100);

  useEffect(() => {
    if (dashboard && selected?.length) {
      dashboard.updateFilters({
        [BRAND_FIELD]: selected,
      });
      dashboard.run();
    }
  }, [selected]);

  const dashboardRef = useCallback(
    (el: HTMLDivElement) => {
      if (el && !el.children.length && selected?.length) {
        const embed_sdk = getEmbedSDK();
        embed_sdk.init(extension_sdk.lookerHostData?.hostUrl!);
        embed_sdk
          .createDashboardWithId("thelook::brand_lookup")
          .appendTo(el)
          .on("page:properties:changed", (event: any) => {
            console.log(event);
            if (event && event.height) {
              setHeight(event.height);
            }
          })
          .withParams({
            [BRAND_FIELD]: selected,
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
    },
    [selected]
  );

  return <StyledBox ref={dashboardRef} style={{ height }} width="100%" />;
};

export default Dashboard;
