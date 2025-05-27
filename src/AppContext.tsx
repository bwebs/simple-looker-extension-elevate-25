import { ILookerConnection } from "@looker/embed-sdk";
import { IUser } from "@looker/sdk";
import React, { createContext, useContext } from "react";
import useSWR from "swr";
import useSdk from "./hooks/useSdk";

type GlobalFilters = { [key: string]: string };

interface AppContextType {
  isLoading: boolean;
  me: IUser | undefined;
  dashboard: ILookerConnection | undefined;
  setDashboard: React.Dispatch<
    React.SetStateAction<ILookerConnection | undefined>
  >;
  global_filters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sdk = useSdk();
  const { data: me, isLoading, error } = useSWR("me", () => sdk.ok(sdk.me()));
  const [dashboard, setDashboard] = React.useState<ILookerConnection>();
  const [global_filters, setGlobalFilters] = React.useState<GlobalFilters>({});

  return (
    <AppContext.Provider
      value={{
        me,
        isLoading,
        dashboard,
        setDashboard,
        global_filters,
        setGlobalFilters,
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
