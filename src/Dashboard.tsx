import { Card } from "@looker/components";
import React from "react";
import styled from "styled-components";

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
  return (
    <StyledCard p="xsmall" raised borderRadius="large">
      Dashboard Goes Here
    </StyledCard>
  );
};

export default Dashboard;
