import { useState, useEffect } from "react";
import shortid from "shortid";
import InputLine from "../InputLine/InputLine";
export default function ({ genres }) {
  const initialState = new Map([
    [shortid.generate(), { type: "cast", value: "" }],
  ]);
  const [canDeleteRule, setCanDeleteRule] = useState(false);
  const [filterRules, setFilterRules] = useState(initialState);
  const filterField = Array.from(filterRules).map(([key, value]) => (
    <InputLine
      key={key}
      id={key}
      genres={genres}
      filterRule={value}
      setFilterRules={setFilterRules}
      canDeleteRule={canDeleteRule}
    />
  ));
  //if only one rule left, disable user's ability to delete rules
  useEffect(() => {
    console.log(filterRules.size);
    if (filterRules.size === 1) {
      setCanDeleteRule(false);
    } else {
      setCanDeleteRule(true);
    }
  }, [filterRules]);
  console.log(canDeleteRule)
  return <form>{filterField}</form>;
}
