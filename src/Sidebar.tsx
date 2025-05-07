import { Box, InputSearch, List, ListItem } from "@looker/components";
import { IRequestRunInlineQuery } from "@looker/sdk";
import React, { useState } from "react";
import useSWR from "swr";
import { useBoolean, useDebounceValue } from "usehooks-ts";
import ProgressIndicator from "./components/ProgressIndicator";
import useSdk from "./hooks/useSdk";

const BRAND_FIELD = "products.brand";
const COUNT_FIELD = "order_items.order_count";
const DATE_FIELD = "order_items.created_date";

const getQuery = (search: string): IRequestRunInlineQuery => {
  return {
    result_format: "json",
    body: {
      model: "thelook",
      view: "order_items",
      fields: [BRAND_FIELD, COUNT_FIELD],
      sorts: [`${COUNT_FIELD} DESC`],
      filters: {
        [BRAND_FIELD]: `%${search.toLowerCase().replace(/\s+/g, "%")}%`,
        [DATE_FIELD]: "30 days ago for 30 days",
      },
      limit: "20",
    },
    apply_formatting: true,
  };
};

const Sidebar: React.FC<{
  selected: string | undefined;
  onSelect: (selected: string) => void;
}> = ({ selected, onSelect }) => {
  const sdk = useSdk();
  const [search, setSearch] = useState("");
  const inputFocused = useBoolean(false);
  const [debounced_search, setDebouncedSearch] = useDebounceValue(search, 500);

  const query = getQuery(debounced_search);
  const { data, isLoading, isValidating, error } = useSWR(
    `sidebar-${debounced_search}`,
    () => sdk.ok(sdk.run_inline_query(query)),
    {
      onSuccess: (data) => {
        if (data && Array.isArray(data)) {
          const firstItem = data[0];
          if (
            firstItem &&
            typeof firstItem === "object" &&
            BRAND_FIELD in firstItem &&
            !selected
          ) {
            onSelect(firstItem[BRAND_FIELD]);
          }
        }
      },
    }
  );
  const loading = search !== debounced_search || isLoading || isValidating;
  return (
    <Box position="relative">
      <InputSearch
        value={search}
        onChange={(value: string) => {
          setSearch(value);
          setDebouncedSearch(value);
        }}
        onFocus={() => {
          inputFocused.setTrue();
        }}
        onBlur={() => {
          inputFocused.setFalse();
        }}
      />
      <ProgressIndicator show={loading} mt={inputFocused.value ? 0.5 : 0} />
      {data && Array.isArray(data) && (
        <List>
          {data.map((row: any, i: number) => (
            <ListItem key={i} onClick={() => onSelect(row[BRAND_FIELD])}>
              {row[BRAND_FIELD]} ({row[COUNT_FIELD]})
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
