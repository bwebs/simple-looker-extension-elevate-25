import { Card } from "@looker/components";
import { getEmbedSDK } from "@looker/embed-sdk";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useAppContext } from "./AppContext";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { urlToRecord } from "./utils/urlToRecord";

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

const Dashboard: React.FC = () => {
  const { setGlobalFilters, setDashboard } = useAppContext();
  const extension_sdk = useExtensionSdk();

  const dashboardRef = useCallback((el: HTMLDivElement) => {
    if (el && !el.children.length) {
      const embed_sdk = getEmbedSDK();
      embed_sdk.init(extension_sdk.lookerHostData?.hostUrl!);
      embed_sdk
        .createDashboardWithId(extension_sdk.getContextData()?.dashboards?.[0]!)
        .appendTo(el)
        .on("page:changed", (event: any) => {
          if (event?.page?.absoluteUrl?.length) {
            const record = urlToRecord(event.page.absoluteUrl);
            setGlobalFilters((previous_filter) => {
              return { ...previous_filter, ...record };
            });
          }
        })
        .build()
        .connect()
        .then((dashboard) => {
          setDashboard(dashboard);
        })
        .catch((error: any) => {
          console.error("Error embedding dashboard:", error);
        });
    }
  }, []);

  return (
    <StyledCard p="xsmall" raised borderRadius="large" ref={dashboardRef} />
  );
};

export default Dashboard;
