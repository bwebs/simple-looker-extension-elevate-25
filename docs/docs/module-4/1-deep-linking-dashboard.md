# Deep Linking a Dashboard

## 🎯 Goal

We want to be able to deep link to a specific dashboard in the extension. This will allow us to share a link to a specific dashboard with a user.

## 🛠️ Instructions

1. Navigate to the [AppContext.tsx](../../../src/AppContext.tsx) file.
2. Add the following line to the AppContextProvider component underneath `const [global_filters, setGlobalFilters] = React.useState<GlobalFilters>(search_params);`

   ```tsx
   const [selected_dashboard_id, setSelectedDashboardId] =
     React.useState<string>(search_params.dashboard_id);
   ```

3. Add a useEffect hook that listens to the selected_dashboard_id state and updates the global_filters state. Place this underneith the other useEffect hook.

   ```tsx
   useEffect(() => {
     updateSearchParams({ dashboard_id: selected_dashboard_id });
   }, [selected_dashboard_id]);
   ```

4. Let's make sure we add the proper types to the AppContext

   ```tsx
   selected_dashboard_id?: string;
   setSelectedDashboardId: React.Dispatch<React.SetStateAction<string | undefined>>;
   ```

5. Next we have to make sure when a user clicks on a dashboard in the sidebar, we update the selected_dashboard_id state. Navigate to the [Sidebar.tsx](../../../src/Sidebar.tsx) file.
6. Find the line with useAppContext() on it and replace it with the following code.

   ```tsx
   const { global_filters, dashboard, setSelectedDashboardId } =
     useAppContext();
   ```

7. Now we need to make sure when a user clicks on a dashboard in the sidebar, we update the selected_dashboard_id state. Navigate to the [Sidebar.tsx](../../../src/Sidebar.tsx) file.
8. Find the `onClick` property and add the following line within it above the line with `dashboard?.loadDashboard(`.

   ```tsx
   setSelectedDashboardId(dashboard_id);
   ```

9. Refresh the page and click on a dashboard in the sidebar. You should see the url update with the dashboard_id. Refresh the page again, the dashboard didn't load with that property.
10. Let's make sure the dashboard loads with the correct filters. Navigate to the [Dashboard.tsx](../../../src/Dashboard.tsx) file.
11. Find the line that has `useAppContext()` and replace it with the following code.

    ```tsx
    const {
      dashboard,
      setGlobalFilters,
      setDashboard,
      global_filters,
      setSelectedDashboardId,
      selected_dashboard_id,
    } = useAppContext();
    ```

12. Now we need to make sure the initial dashboard load has the correct filters applied. Navigate to [Dashboard.tsx](../../../src/Dashboard.tsx)
13. Find the dashboarRef callback, and in the function, below the `embedsdk.init` line, add the following code to make sure that we are using the dashboard_id from the url if it exists; if not, we will use the first dashboard in the folder or the first dashboard in the context data.

    ```tsx
    let initial_dashboard = selected_dashboard_id;
    if (!initial_dashboard) {
      initial_dashboard = extension_sdk.getContextData()?.dashboards?.[0];
    }

    if (!initial_dashboard) {
      return;
    }
    if (!selected_dashboard_id) {
      setSelectedDashboardId(initial_dashboard);
    }
    ```
