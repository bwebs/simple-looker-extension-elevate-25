import { Box, Card, CodeBlock, Header, Span } from "@looker/components";
import React from "react";
import Balancer from "react-wrap-balancer";
import { useAppContext } from "./AppContext";
import Settings from "./Settings";

const Sidebar: React.FC = () => {
  const { global_filters } = useAppContext();
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
      <Balancer>
        Configureable dashboard selections will go here: below are global
        dashboard filters
      </Balancer>
      <CodeBlock fontSize="xxsmall">
        {JSON.stringify(global_filters, null, 2)}
      </CodeBlock>
      <Box flexGrow={1} />
      <Settings />
    </Card>
  );
};

export default Sidebar;
