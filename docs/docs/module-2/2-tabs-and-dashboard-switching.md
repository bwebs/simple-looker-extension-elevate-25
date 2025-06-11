# Tabs and Dashboard Switching

## 🎯 Goal

In this step, you'll create a dynamic sidebar that displays user-configured dashboards as clickable tabs. You'll load dashboards on demand using `loadDashboard()`, apply active filter values, and highlight the currently selected dashboard.

## 🛠️ Instructions

1. Open up the [Sidebar.tsx](../../../src/Sidebar.tsx) file.

2. Load in the extension context to this component with the following code that you can paste in underneath the `const Sidebar: React.FC = () => {` statement. This will be used to get the dashboard ids from the extension config.

   ```tsx
   const extension_sdk = useExtensionSdk();
   const config_data = extension_sdk.getContextData();
   const dashboard_ids = config_data?.[DASHBOARD_ID_KEY] || [];
   ```

3. Update your imports

```tsx
import { DASHBOARD_ID_KEY } from "./utils/constants";
import useExtensionSdk from "./hooks/useExtensionSdk";
```

4. Replace the placeholder components `<Balancer>Configureable dashboard selections...</Balancer>` with the following code. This will display a button for each dashboard_id in the sidebar:

   ```tsx
   <List>
     {dashboard_ids.map((dashboard_id: string) => (
       <ListItem key={dashboard_id} onClick={() => {}}>
         {dashboard_id}
       </ListItem>
     ))}
   </List>
   ```

5. Import your Looker components

```tsx
import { List, ListItem } from "@looker/components";
```

6. Now we need to set the next dashboard to load when the user clicks on a button. We'll start by using our dashboard object from the AppContext. This import `import { useAppContext } from "./AppContext";` should already be loaded. You will need to replace the line `const { global_filters } = useAppContext();` with the following code.

   ```tsx
   const { global_filters, dashboard } = useAppContext();
   ```

7. Now we need to add a function to load the next dashboard. Add the following `onClick` to the `ListItem` component replacing the current onClick code `onClick={() => { }}`:

   ```tsx
   onClick={() => {
       dashboard?.loadDashboard(
       dashboard_id +
           "?" +
           Object.entries(global_filters)
           .map(([key, value]) => `${key}=${value}`)
           .join("&")
       );
   }}
   ```

8. Make the `ListItem` show selected state when the dashboard is loaded:

   ```tsx
    <ListItem
       selected={dashboard?._currentPathname?.startsWith(
           `/embed/dashboards/${dashboard_id}`
       )}
       key={dashboard_id}
       // rest of component
   ```

9. Navigate over to the [Dashboard.tsx](../../../src/Dashboard.tsx) file.
10. Change your hard coded `.createDashboardWithId("thelook_ecomm::business_pulse")` to `.createDashboardWithId(extension_sdk.getContextData()?.dashboards?.[0]!)` so that the initial load navigates to the first dashboard in the sidebar.
11. Refresh the page and you should see your first dashboard load, the tabs clickable, and when you change the dashboard filters, you should see the JSON object in the sidebar that shows the current filter state of the dashboards. Change a filter like the Date filter and change the dashboard, it will be reflected on the dashboard if you have the same filter names on it.

## Learn more

- [📘 Looker Components](./glossary.md#looker-components)
- [📘 React's component key property](./glossary.md#what-is-key-in-listitem-keydashboard_id-)

```

```
