import { Card } from "@looker/components";
import { getEmbedSDK, ILookerConnection } from "@looker/embed-sdk";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useAppContext } from "./AppContext";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { DASHBOARD_ID_KEY } from "./utils/constants";
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
  const { dashboard, setGlobalFilters, setDashboard } = useAppContext();
  const extension_sdk = useExtensionSdk();
  const dashboardRef = useCallback(
    (el: HTMLDivElement) => {
      if (el && !el.children.length) {
        const embed_sdk = getEmbedSDK();
        embed_sdk.init(extension_sdk.lookerHostData?.hostUrl!);
        const config_data = extension_sdk.getContextData();
        const dashboard_ids = config_data?.[DASHBOARD_ID_KEY] || [];
        embed_sdk
          .createDashboardWithId(dashboard_ids[0]!)
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
          .then((connection: ILookerConnection) => {
            setDashboard(connection);
          })
          .catch((error: any) => {
            console.error("Error embedding dashboard:", error);
          });
      }
    },
    [extension_sdk, setGlobalFilters, setDashboard]
  );

  return (
    <StyledCard p="xsmall" raised borderRadius="large" ref={dashboardRef} />
  );
};

export default Dashboard;
