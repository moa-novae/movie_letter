import { useState } from "react";
import shortid from "shortid";
import InputLine from "../InputLine/InputLine";
export default function ({ genres }) {
  const initialState = new Map([
    [shortid.generate(), { type: "cast", value: "" }],
  ]);

  const [filterRules, setFilterRules] = useState(initialState);
  const filterField = Array.from(filterRules).map(([key, value]) => (
    <InputLine
      key={key}
      id={key}
      genres={genres}
      filterRule={value}
      setFilterRules={setFilterRules}
    />
  ));
  return <form>{filterField}</form>;
}
