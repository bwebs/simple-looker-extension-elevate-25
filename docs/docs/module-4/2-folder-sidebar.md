# Folder Sidebar

## 🎯 Goal

## 🛠️ Instructions

1. Navigate to the [AppContext.tsx](../../../src/AppContext.tsx) file.
2. Add the following code to the AppContextProvider component after the `const [selected_dashboard_id, setSelectedDashboardId]` line.
   ```tsx
   const location = useLocation();
   const folder_id = location.pathname.startsWith("/folders/")
     ? location.pathname.split("/")[2]
     : undefined;
   ```
3. Make sure you import the `useLocation` hook at the top of the file.
   ```tsx
   import { useLocation } from "react-router-dom";
   ```
4. Let's return the folder_id from the `<AppContextProvider value={}>`. In the value property, add `folder_id` in the json object. This is what the value looks like now:
   ```tsx
   {
     me,
       isLoading,
       dashboard,
       setDashboard,
       global_filters,
       setGlobalFilters,
       folder_id,
       selected_dashboard_id,
       setSelectedDashboardId;
   }
   ```
5. Lets now add the folder_id type to the `AppContextType` interface. Above the `selected_dashboard_id?: string;`, add the following code.

   ```tsx
       folder_id?: string
   ```

6. Now we need to make sure the initial dashboard load has the correct filters applied. Navigate to [Sidebar.tsx](../../../src/Sidebar.tsx)
7. Find the line that has `useAppContext()` and replace it with the following code.

   ```tsx
   const { global_filters, dashboard, folder_id, setSelectedDashboardId } =
     useAppContext();
   ```

8. Find the line that has `useSdk()` and add the following code on the next line. This will fetch the dashboards in the folder.

   ```tsx
   const folder_dashboards = useSWR(
     folder_id ? `folder-dashboards-${folder_id}` : null,
     () => sdk.ok(sdk.folder_dashboards(folder_id!, "id"))
   );
   const show_dashboards = folder_id
     ? folder_dashboards.data?.map((d) => d.id!) || []
     : dashboard_ids;
   ```

9. Now we need to use the show_dashboards array to build the sidebar items. Find the line that has `dashboard_ids.map` and replace `dashboard_ids.map` with `show_dashboards.map`.
10. In your URL, add a folder_id that has dashboards in it to the URL like so. `/extensions/thelook_ecommerce::simple_extension/` will become `/extensions/thelook_ecommerce::simple_extension/folders/10`
11. The extension now works with both the dashboard_id and the folder_id, so you can use this link to build a tabbed dashboard for any folder.
