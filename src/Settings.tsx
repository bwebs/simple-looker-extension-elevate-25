import {
  ButtonOutline,
  Dialog,
  DialogContent,
  DialogHeader,
} from "@looker/components";
import React from "react";
import { useBoolean } from "usehooks-ts";

const Settings: React.FC = () => {
  const open = useBoolean(false);

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
          Dashbaord configuraiton will go here
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
