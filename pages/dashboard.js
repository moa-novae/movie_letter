import { EuiBasicTable, EuiCheckbox } from "@elastic/eui";
import { fetchAllFilters } from "../db/initializeFirestore";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function () {
  const { user } = useFirebaseAuth();
  const [filterRules, setFilterRules] = useState([]);
  useEffect(() => {
    async function asyncFetch(uid) {
      if (user) {
        const data = await fetchAllFilters(uid);
        console.log("uid: ", uid);
        console.log("data: ", data);
        setFilterRules(Object.values(data.filters));
      }
    }
    asyncFetch(user?.uid);
  }, [user]);
  console.log("data", filterRules);
  const columns = [
    { field: "name", name: "Name", sortable: true },
    {
      field: "enabled",
      name: "Enabled",
      dataType: "boolean",
      render: (enabled) => <EuiCheckbox checked={enabled} />,
    },
  ];

  return (
    <>
      <p>Dashboard</p>;
      <EuiBasicTable items={filterRules} columns={columns} responsive={false} />
    </>
  );
}
