import {
  ButtonOutline,
  Dialog,
  DialogContent,
  DialogHeader,
  InputChips,
  Label,
  Space,
} from "@looker/components";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { DASHBOARD_ID_KEY } from "./utils/constants";

const Settings: React.FC = () => {
  const open = useBoolean(false);
  const extension_sdk = useExtensionSdk();
  const config_data = extension_sdk.getContextData();
  const [dashboard_ids, setDashboardIds] = useState<string[]>(
    config_data?.[DASHBOARD_ID_KEY] || []
  );

  const handleChange = async (values: string[]) => {
    setDashboardIds(values);
    await extension_sdk.saveContextData({
      [DASHBOARD_ID_KEY]: values,
    });
    await extension_sdk.refreshContextData();
  };

  return (
    <>
      <ButtonOutline onClick={() => open.setTrue()}>Settings</ButtonOutline>
      <Dialog
        isOpen={open.value}
        onClose={async () => {
          open.setFalse();
        }}
      >
        <DialogHeader>Settings</DialogHeader>
        <DialogContent minHeight={"400px"}>
          <Space>
            <Label>Dashboard IDs for the tabs</Label>
            <InputChips
              placeholder="Dashboard IDs"
              values={dashboard_ids}
              onChange={handleChange}
            />
          </Space>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
