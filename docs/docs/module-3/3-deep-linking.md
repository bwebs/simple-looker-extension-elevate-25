# Deep Linking

## 🎯 Goal

A common use case with dashboards today, is to change a few filters and then share the link with someone. We'll show you how to do this with our extension and tabbed dashboards.

## 🛠️ Instructions

1. Navigate to the [AppContext.tsx](../../../src/AppContext.tsx) file.
2. In the AppContextProvider component, copy and paste the following line to pull in the url parameters and a way to update them. Place this right after the `export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {` line.

```tsx
const { search_params, updateSearchParams } = useSearchParams();
```

3. Make sure you import the `useSearchParams` hook at the top of the file.

   ```tsx
   import useSearchParams from "./hooks/useSearchParams";
   ```

4. Now we're going update the global filters so they are hydrated with the url parameters. Replace the `const [global_filters, setGlobalFilters] = React.useState<GlobalFilters>({});` line with the following code.

   ```tsx
   const [global_filters, setGlobalFilters] =
     React.useState<GlobalFilters>(search_params);
   ```

5. Now we're going to update the global filters so they are hydrated with the url parameters. Replace the `const [global_filters, setGlobalFilters] = React.useState<GlobalFilters>({});` line with the following code.

   ```tsx
   const [global_filters, setGlobalFilters] =
     React.useState<GlobalFilters>(search_params);
   ```

6. Next we're going to make sure the url gets updated everytime our GlobalFilters state changes. Below the global settings state `const [global_filters, setGlobalFilters] =  React.useState<GlobalFilters>(search_params);` add the following code.

   ```tsx
   useEffect(() => {
     updateSearchParams(global_filters);
   }, [global_filters]);
   ```

7. Now add the imports for [UseEffect](./glossary.md#understanding-useeffect-hook) at the top of the file. UseEffect is a way that React can run code after other variables have been changed.

   ```tsx
   import { useEffect } from "react";
   ```

8. Refresh the page and change some dashboard filters, you should see the url update with the filter values.
9. Now we need to make sure the initial dashboard load has the correct filters applied. Navigate to [Dashboard.tsx](../../../src/Dashboard.tsx)
10. Make sure we include the global_filters from the useAppContext. Find the line that has `const { dashboard, setGlobalFilters, setDashboard } = useAppContext();` and replace it with

    ```tsx
    const { dashboard, setGlobalFilters, setDashboard, global_filters } =
      useAppContext();
    ```

11. Now we need to make sure the initial dashboard load has the correct filters applied. Navigate to [Dashboard.tsx](../../../src/Dashboard.tsx)
12. Make sure we include the global_filters from the useAppContext. Find the line where we load the initial dashboard `.createDashboardWithId(extension_sdk.getContextData()?.dashboards?.[0]!)` and underneith it, add the following code.

    ```tsx
    .withParams(global_filters)
    ```

13. Refresh the page, change some filters, refresh the page and you should see the dashboard load with the correct filters applied.
