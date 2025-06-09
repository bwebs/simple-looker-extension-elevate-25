import { IUser } from "@looker/sdk";
import React, { createContext, useContext } from "react";
import useSWR from "swr";
import useSdk from "./hooks/useSdk";

type GlobalFilters = { [key: string]: string };

interface AppContextType {
  isLoading: boolean;
  me: IUser | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sdk = useSdk();
  const { data: me, isLoading, error } = useSWR("me", () => sdk.ok(sdk.me()));

  return (
    <AppContext.Provider
      value={{
        me,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
