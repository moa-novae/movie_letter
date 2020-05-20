import { EuiBasicTable, EuiCheckbox } from "@elastic/eui";
import { fetchAllFilters } from "../db/initializeFirestore";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect, useState } from "react";
import { toggleFilter, deleteFilter } from "../db/initializeFirestore";

export default function () {
  const { user } = useFirebaseAuth();
  const [filterRules, setFilterRules] = useState(new Map());
  useEffect(() => {
    async function asyncFetch(uid) {
      if (user) {
        const data = await fetchAllFilters(uid);
        //inject userId into each row of table, so deleteFilter can access userId
        for (let [key, value] of Object.entries(data.filters)) {
          data.filters[key] = { ...value, uid };
        }
        setFilterRules(new Map(Object.entries(data.filters)));
      }
    }
    asyncFetch(user?.uid);
  }, [user]);
  const test = () => {
    console.log("clicked");
  };
  const actions = [
    {
      name: "Edit",
      description: "Edit this rule",
      icon: "documentEdit",
      type: "icon",
      onClick: test,
    },
    {
      name: "Delete",
      description: "Delete this rule",
      icon: "trash",
      type: "icon",
      color: "danger",
      onClick: deleteFilter,
    },
  ];
  const columns = [
    { field: "name", name: "Name", sortable: true },
    {
      field: "enabled",
      name: "Enabled",
      dataType: "boolean",
      render: (enabled, filter) => (
        <EuiCheckbox
          checked={enabled}
          onChange={() => {
            //change local state
            setFilterRules((prev) => {
              const newMap = new Map(prev);
              const oldFilterRule = newMap.get(filter.filterId);
              const newFilterRule = { ...oldFilterRule, enabled: !enabled };
              newMap.set(filter.filterId, newFilterRule);
              return newMap;
            });
            //change firestore
            toggleFilter(user.uid, filter.filterId, !enabled);
          }}
        />
      ),
    },
    { name: "Actions", actions },
  ];

  return (
    <>
      <p>Dashboard</p>
      <EuiBasicTable
        // consolidate map values to array
        items={Array.from(filterRules.values())}
        columns={columns}
        responsive={false}
      />
    </>
  );
}
