import { Box, Card, CodeBlock, Header, Span } from "@looker/components";
import React from "react";
import Balancer from "react-wrap-balancer";
import { useAppContext } from "./AppContext";
import Settings from "./Settings";
import { DASHBOARD_ID_KEY } from "./utils/constants";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { List, ListItem } from "@looker/components";

const Sidebar: React.FC = () => {
  const extension_sdk = useExtensionSdk();
  const config_data = extension_sdk.getContextData();
  const dashboard_ids = config_data?.[DASHBOARD_ID_KEY] || [];
  const { global_filters, dashboard } = useAppContext();
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
        {dashboard_ids.map((dashboard_id: string) => (
          <ListItem key={dashboard_id} onClick={() => {
            dashboard?.loadDashboard(
              dashboard_id +
              "?" +
              Object.entries(global_filters)
                .map(([key, value]) => `${key}=${value}`)
                .join("&")
            );
          }} >
            {dashboard_id}
          </ListItem>
        ))}
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
