import React, { useState } from "react";
import shortid from "shortid";
import dynamic from "next/dynamic";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSelect,
} from "@elastic/eui";
const AddRemoveBtn = dynamic(() => import("../addRemoveBtn/AddRemoveBtn"), {
  ssr: false,
});

export default function InputLine({
  canDeleteRule,
  deleteErrorsOnTypeChange,
  error,
  filterRule,
  genres,
  handleBlur,
  id,
  setFilterRules,
}) {
  const filterTypes = [
    { value: "cast", text: "Cast" },
    { value: "director", text: "Director" },
    { value: "genre", text: "Genre" },
    { value: "productionCompany", text: "Production Company" },
  ];
  //convert genres passed down to an obj consumable by eui
  const genreOptions = genres.map((genre) => ({
    value: genre.genre_id,
    text: genre.name,
  }));
  // const genreOptions = genres.map((genre) => (
  //   <option key={genre} value={genre.genre_id}>
  //     {genre.name}
  //   </option>
  // ));
  function handleInputTypeChange(e) {
    const newType = e.target.value;
    deleteErrorsOnTypeChange(id);
    setFilterRules((prev) => {
      const newState = new Map(prev);
      newState.set(id, { value: "", type: newType });

      return newState;
    });
  }

  function handleFilterRuleDelete(e) {
    const targetId = id;
    setFilterRules((prev) => {
      const newState = new Map(prev);
      newState.delete(targetId);

      return newState;
    });
  }

  function handleFilterRuleAdd(e) {
    const targetId = id;
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

  function handleOnChange(e) {
    const newRuleValue = e.target.value;
    setFilterRules((prev) => {
      const newState = new Map(prev);
      const oldRule = prev.get(id);
      newState.set(id, { ...oldRule, value: newRuleValue });
      return newState;
    });
  }

  return (
    <EuiFlexGroup>
      {/* Select type flexItem */}
      <EuiFlexItem grow={false}>
        <EuiFormRow label="Filter Type">
          <EuiSelect
            options={filterTypes}
            value={filterRule.type}
            onChange={handleInputTypeChange}
          />
        </EuiFormRow>
      </EuiFlexItem>
      {(filterRule.type === "cast" ||
        filterRule.type === "director" ||
        filterRule.type === "productionCompany") && (
        <EuiFlexItem>
          <div>
            <EuiFormRow
              label="Value"
              error={error}
              isInvalid={error && error?.length > 0}
            >
              <EuiFieldText
                value={filterRule.value}
                onChange={handleOnChange}
                name={id}
                onBlur={handleBlur}
                isInvalid={error && error?.length > 0}
              />
            </EuiFormRow>

            <AddRemoveBtn
              handleFilterRuleAdd={handleFilterRuleAdd}
              handleFilterRuleDelete={handleFilterRuleDelete}
              canDeleteRule={canDeleteRule}
            />
          </div>
        </EuiFlexItem>
      )}

      {filterRule.type === "genre" && (
        <EuiFlexItem grow={false}>
          <div>
            <EuiFormRow
              label="Value"
              error={error}
              isInvalid={error && error?.length > 0}
            >
              <EuiSelect
                options={genreOptions}
                value={filterRule.value}
                onChange={handleOnChange}
                name={id}
                onBlur={handleBlur}
                isInvalid={error && error?.length > 0}
              />
            </EuiFormRow>

            <AddRemoveBtn
              canDeleteRule={canDeleteRule}
              handleFilterRuleAdd={handleFilterRuleAdd}
              handleFilterRuleDelete={handleFilterRuleDelete}
            />
          </div>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
}
