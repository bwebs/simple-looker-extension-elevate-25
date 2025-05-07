import { Box, Header, Span } from "@looker/components";
import React, { useState } from "react";
import useSWR from "swr";
import Dashboard from "./Dashboard";
import useSdk from "./hooks/useSdk";
import Sidebar from "./Sidebar";

const App: React.FC = () => {
  const [selected, setSelected] = useState<string>();
  const sdk = useSdk();
  const { data: me, isLoading, error } = useSWR("me", () => sdk.ok(sdk.me()));

  if (isLoading) {
    return <Box>Loading...</Box>;
  } else if (error) {
    return <Box>Error: {error.message}</Box>;
  } else if (me) {
    return (
      <>
        <Header>
          <Span p="xsmall" fontSize="xlarge">
            Simple Extension
          </Span>
        </Header>
        <Box display="grid" style={{ gridTemplateColumns: "300px 1fr" }}>
          <Sidebar selected={selected} onSelect={setSelected} />
          <Dashboard selected={selected} />
        </Box>
      </>
    );
  } else {
    return <Box>Unknown error</Box>;
  }
};

export default App;
