# Tabs and Dashboard Switching

## 🎯 Goal

In this step, you’ll create a dynamic sidebar that displays user-configured dashboards as clickable tabs. You’ll load dashboards on demand using `loadDashboard()`, apply active filter values, and highlight the currently selected dashboard.

## 🛠️ Instructions

1. Open up the [Sidebar.tsx](../../src/Sidebar.tsx) file.

2. Load in the extension context to this component with the following code:
    ```tsx
    const Sidebar: React.FC = () => {
    const extension_sdk = useExtensionSdk();
    const config_data = extension_sdk.getContextData();
    const dashboard_ids = config_data?.[DASHBOARD_ID_KEY] || [];
    // rest of the component

    ```

3. Make sure you import the constants file `import { DASHBOARD_ID_KEY } from "./utils/constants";` as well as the useExtensionSdk hook `import useExtensionSdk from "./hooks/useExtensionSdk";`

4. Replace the placeholder components `<Balancer>Configureable dashboard selections...</Balancer>` with the following code. This will display a button for each dashboard_id in the sidebar:

    ```tsx
    <List>
        {dashboard_ids.map((dashboard_id) => (
            <ListItem key={dashboard_id} onClick={() => {}}>
                {dashboard_id}
            </ListItem>
        ))}
    </List>
    ```

5. Now we need to set the next dashboard to load when the user clicks on a button. We'll start by using our dashboard object from the AppContext. This import `import { useAppContext } from "./AppContext";` should already be loaded.

    ```tsx
    const Sidebar: React.FC = () => {
        const { global_filters, dashboard } = useAppContext();
        // rest of the component
    ```

6. Now we need to add a function to load the next dashboard. Add the following `onClick` to the `ListItem` component:

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

7. Make the `ListItem` show selected state when the dashboard is loaded:

    ```tsx
    <ListItem
        selected={dashboard?._currentPathname?.startsWith(
            `/embed/dashboards/${dashboard_id}`
        )}
        key={dashboard_id}
        // rest of component
    ```

8. Navigate over to the [Dashboard.tsx](../../src/Dashboard.tsx) file.
9. Change your hard coded `dashboard_id` in `createDashboardWithId` to `.createDashboardWithId(extension_sdk.getContextData()?.dashboards?.[0]!)` so that the initial load navigates to the first dashboard in the sidebar.

---

Learn more:

- [📘 Looker Components](./glossary.md#looker-components)
- [📘 React's component key property](./glossary.md#what-is-key-in-listitem-keydashboard_id-)
