import {
  Box,
  Card,
  CodeBlock,
  Header,
  List,
  ListItem,
  Span,
} from "@looker/components";
import React from "react";
import Balancer from "react-wrap-balancer";
import { useAppContext } from "./AppContext";
import Settings from "./Settings";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { DASHBOARD_ID_KEY } from "./utils/constants";

const Sidebar: React.FC = () => {
  const { global_filters, dashboard } = useAppContext();
  const extension_sdk = useExtensionSdk();
  const config_data = extension_sdk.getContextData();
  const dashboard_ids: string[] = config_data?.[DASHBOARD_ID_KEY] || [];
  return (
    <Card
      raised
      position="relative"
      backgroundColor="#B7C9E2"
      p="xsmall"
      borderRadius="large"
    >
      <Header>
        <Span p="xsmall" fontSize="xlarge">
          <Balancer>Tabbed Dashboard Dashboard Elevate '25</Balancer>
        </Span>
      </Header>
      <List>
        {dashboard_ids.map((dashboard_id) => {
          return (
            <ListItem
              color="current"
              itemRole="link"
              selected={dashboard?._currentPathname?.startsWith(
                `/embed/dashboards/${dashboard_id}`
              )}
              onClick={() => {
                dashboard?.loadDashboard(
                  dashboard_id +
                    "?" +
                    Object.entries(global_filters)
                      .map(([key, value]) => `${key}=${value}`)
                      .join("&")
                );
              }}
            >
              {dashboard_id}
            </ListItem>
          );
        })}
      </List>
      <CodeBlock fontSize="xxsmall">
        {JSON.stringify(global_filters, null, 2)}
      </CodeBlock>
      <Box flexGrow={1} />
      <Settings />
    </Card>
  );
};

export default Sidebar;
