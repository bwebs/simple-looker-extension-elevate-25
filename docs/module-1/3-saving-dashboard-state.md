# Saving Dashboard State and Filters

## 🎯 Goal

In this step, you'll extend your extension's functionality by saving the embedded dashboard instance and capturing user-applied filter state. You'll store both in React Context so that other components (like the Sidebar) can access and respond to changes in real time.

## 🛠️ Instructions

1. in `AppContext.tsx`, add the following state variables:
    ```tsx
    const [dashboard, setDashboard] = useState<ILookerConnection>();
    const [global_filters, setGlobalFilters] = useState<Record<string, string>>(
        {}
      );
    ```

2. Make sure to import your types: 
    - `import { useState } from "react";`
    - `import { ILookerConnection } from "@looker/embed-sdk";`
3. We need to adjust the `AppContextType` type to include the new state variables by adding dashboard and global_filters:
    ```tsx
    interface AppContextType {
      isLoading: boolean;
      me: IUser | undefined;
      dashboard: ILookerConnection | undefined;
      setDashboard: React.Dispatch<React.SetStateAction<ILookerConnection | undefined>>;
      global_filters: GlobalFilters;
      setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
    }
    ```
4. Update the return of `AppContext.Provider` to include the new state variables:
    ```tsx
    return (
      <AppContext.Provider value={{
        isLoading,
        me,
        dashboard,
        setDashboard,
        global_filters,
        setGlobalFilters,
      }}>
        {children}
      </AppContext.Provider>
    );
    ```
5. Navigate to the [Dashboard.tsx](../../src/Dashboard.tsx) file.
6. Within the Dashboard component at the top, include the useAppContext hook and make sure to import using `import { useAppContext } from "./AppContext";`
    ```tsx
    const Dashboard: React.FC = () => {
      const { dashboard, setGlobalFilters, setDashboard } = useAppContext();
      const extension_sdk = useExtensionSdk();
      // ... rest of the code
    ```

7. Update the `embed_sdk` variable within the dashboard callback by adding .on() to capture the url from the `page:changed` event.
    ```tsx
    embed_sdk
    .createDashboardWithId("thelook::business_pulse")
    .appendTo(el)
    .on("page:changed", (event: any) => {
        if (event?.page?.absoluteUrl?.length) {
            const record = urlToRecord(event.page.absoluteUrl);
            setGlobalFilters((previous_filter) => {
                return { ...previous_filter, ...record };
            });
        }
    })
    // ... rest of the code
    ```

8. Navigate to the [Sidebar.tsx](../../src/Sidebar.tsx) file.
9. Reference the `global_filters` from the `useAppContext` and update the code block to include the `global_filters` state variable.
    ```tsx
    const Sidebar: React.FC = () => {
        const { global_filters } = useAppContext();
        return (
            // ... sidebar components
            <CodeBlock fontSize="xxsmall">{JSON.stringify(global_filters, null, 2)}</CodeBlock>
        )
    }
    ```
---

Learn more:

- [📘 Interfaces and Types in TypeScript](./glossary.md#interfaces-and-types-in-typescript)
- [📘 React's Context API](./glossary.md#reacts-context-api)
- [📘 React's useState](./glossary.md#reacts-usestate)