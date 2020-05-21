import { EuiBasicTable, EuiCheckbox, EuiButton } from "@elastic/eui";
import { fetchAllFilters } from "../db/initializeFirestore";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect, useState } from "react";
import { toggleFilter, deleteFilter } from "../db/initializeFirestore";
import Head from "next/head";
import Multifield from "../components/multifield/Multifield";
import { getGenres } from "./api/genres";

export default function ({ genres }) {
  const { user } = useFirebaseAuth();
  const [allFilterRules, setAllFilterRules] = useState(new Map());
  const [dashboardView, setDashboardView] = useState(true);
  useEffect(() => {
    async function asyncFetch(uid) {
      if (user) {
        const data = await fetchAllFilters(uid);
        //inject userId into each row of table, so deleteFilter can access userId
        for (let [key, value] of Object.entries(data.filters)) {
          data.filters[key] = { ...value, uid };
        }
        setAllFilterRules(new Map(Object.entries(data.filters)));
      }
    }
    asyncFetch(user?.uid);
  }, [user]);
  const test = () => {
    console.log("clicked");
  };
  const deleteFilterStateAndFirestore = function (rule) {
    deleteFilter(rule);
    setAllFilterRules((prev) => {
      const newMap = new Map(prev);
      newMap.delete(rule.filterId);
      return newMap;
    });
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
      onClick: deleteFilterStateAndFirestore,
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
            setAllFilterRules((prev) => {
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
      {dashboardView && (
        <>
          <p>Dashboard</p>
          <EuiBasicTable
            // consolidate map values to array
            items={Array.from(allFilterRules.values())}
            columns={columns}
            responsive={false}
          />

          <EuiButton
            onClick={() => {
              setDashboardView(false);
            }}
          >
            Create New
          </EuiButton>
        </>
      )}
      {!dashboardView && (
        <main>
          <Multifield
            genres={genres}
            setDashboardView={setDashboardView}
            setAllFilterRules={setAllFilterRules}
          />
        </main>
      )}
    </>
  );
}
export async function getStaticProps() {
  const genres = await getGenres();
  return {
    props: { genres },
  };
}
