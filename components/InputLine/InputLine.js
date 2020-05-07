import React, { useState } from "react";
import shortid from "shortid";
export default function InputLine({
  genres,
  filterRule,
  setFilterRules,
  id,
  canDeleteRule,
}) {
  const selectedInputDetail = {
    cast: <input type="text" name="cast" />,
    director: <input type="text" name="director" />,
    genre: (
      <select name="genre">
        {genres.map((genre) => (
          <option key={genre} value={genre.genre_id}>
            {genre.name}
          </option>
        ))}
      </select>
    ),
    productionCompany: <input type="text" name="productionCompany" />,
  };
  function handleInputTypeChange(e) {
    const newType = e.target.value;
    setFilterRules((prev) => {
      const newState = new Map(prev);
      newState.set(id, { ...filterRule, type: newType });
      console.log(newState);
      return newState;
    });
  }

  function handleFilterRuleDelete(e) {
    const targetId = e.target.name;
    setFilterRules((prev) => {
      const newState = new Map(prev);
      newState.delete(targetId);
      return newState;
    });
  }

  function handleFilterRuleAdd(e) {
    const targetId = e.target.name;
    setFilterRules((prev) => {
      const newState = new Map();
      //A new filter rule is inserted after the filter which '+' is clicked on
      //Since map is iterated in insertion order, this allows filter rules to be displayed
      //in the right order
      for (let [key, value] of prev) {
        newState.set(key, value);
        if (key === targetId) {
          newState.set(shortid.generate(), { type: "cast", value: "" });
        }
      }
      return newState;
    });
  }

  return (
    <div>
      <select
        name="queryTypes"
        value={filterRule.type}
        onChange={handleInputTypeChange}
      >
        {Object.keys(selectedInputDetail).map((filterType) => (
          <option key={filterType} value={filterType}>{filterType}</option>
        ))}
      </select>
      {selectedInputDetail[filterRule.type]}
      <button type="button" name={id} onClick={handleFilterRuleAdd}>
        +
      </button>
      <button
        type="button"
        name={id}
        disabled={!canDeleteRule}
        onClick={handleFilterRuleDelete}
      >
        -
      </button>
    </div>
  );
}
