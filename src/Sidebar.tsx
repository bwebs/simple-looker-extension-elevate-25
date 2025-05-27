import { Card, Header, Span } from "@looker/components";
import React from "react";
import Balancer from "react-wrap-balancer";

const Sidebar: React.FC = () => {
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
      <Span p="xsmall">Dashboard tabs go here</Span>
    </Card>
  );
};

export default Sidebar;
