# Extension Config

## 🎯 Goal

The Looker Extension API provides a set of methods for storing and retrieving configuration or state data that persists across user sessions. The most relevant methods for this are:

- **getContextData**: Retrieves the current context data for the extension. This is typically used to load saved settings or configuration when the extension initializes.
- **saveContextData**: Persists new or updated context data. This allows you to save user preferences or other stateful information.
- **refreshContextData**: Forces the extension to reload the context data, ensuring the UI reflects the latest saved state.

In this step, you’ll use the Looker Extension SDK to save and load user-defined dashboard IDs. This allows your extension to persist configuration settings across sessions and provide a personalized experience.

## 🛠️ Instructions

To get started working on Module 2, run:

```
git checkout module2-start --force
```

To jump to the end of this module in case you run out of time, run:

```
git checkout module2-end --force
```

1. Open the `Settings.tsx` file
2. Add the following code to the Settings component. This should be pasted just underneaith `const Settings: React.FC = () => {` and `const open = useBoolean(false);`. This is used for getting and saving the dashboard ids as a configuration for the overall extension.

   ```tsx
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
   // rest of the code
   ```

3. Make sure you import these statements.

```
import { DASHBOARD_ID_KEY } from "./utils/constants";
import useExtensionSdk from "./hooks/useExtensionSdk";
import { useState } from "react";
```

4. Now lets add an `InputChips` component that displays and saves any `dashboard_id` we put in the component. You will repalce the line that says `Dashbaord configuraiton will go here` with the following code.

   ```tsx
   <Space>
     <Label>Dashboard IDs for the tabs</Label>
     <InputChips
       placeholder="Dashboard IDs"
       values={dashboard_ids}
       onChange={handleChange}
     />
   </Space>
   ```

5. Make sure to import `Space`, `label`, and `InputChips` from @looker/components:

   ```
   import { Space, Label, InputChips } from "@looker/components";
   ```

6. Refresh your extension and click the Settings button in the top left.
7. Enter in `thelook_ecomm::business_pulse,thelook_ecomm::brand_lookup` if you are using a demo instance. If not, put in any dashboard_ids, lookml or not, from your instance.
8. Close the modal and refresh the page and open the settings again, you should see these two values saved.

In the next section, we will be displaying these dashboard ids in the sidebar and load the iframe for each dashboard.

## Learn more

- [📘 Extension Context Data](./glossary.md#extension-context-data)
- [📘 Looker Components](./glossary.md#looker-components)
