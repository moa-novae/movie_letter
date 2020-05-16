import { useState, useEffect } from "react";
import shortid from "shortid";
import axios from "axios";
import InputLine from "../InputLine/InputLine";
import useFilterForm from "../../hooks/filterForm";

import "./style.scss";

import {
  EuiFieldText,
  EuiForm,
  EuiRadioGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiFlexGroup,
  EuiButton,
} from "@elastic/eui";
export default function ({ genres }) {
  const {
    canDeleteRule,
    setCanDeleteRule,
    filterRules,
    setFilterRules,
    form,
    setForm,
    handleOnChange,
    submiting,
    setsubmiting,
    handleSubmit,
    errors,
    handleBlur,
    deleteErrorsOnTypeChange,
  } = useFilterForm(new Map([["lxkl8gj", { type: "cast", value: "" }]]));

  const filterList =
    filterRules &&
    Array.from(filterRules).map(([id, value]) => (
      <InputLine
        key={id}
        id={id}
        genres={genres}
        filterRule={value}
        setFilterRules={setFilterRules}
        canDeleteRule={canDeleteRule}
        handleBlur={handleBlur}
        error={errors[id]}
        deleteErrorsOnTypeChange={deleteErrorsOnTypeChange}
      />
    ));
  //if only one rule left, disable user's ability to delete rules

  const anyOrAll = [
    { id: "all", value: "all", label: "Match all of the following" },
    { id: "any", value: "any", label: "Match any of the following" },
  ];

  return (
    <EuiForm component="form" className="filter-form">
      <EuiFormRow>
        <EuiFormRow label="Filter Name">
          <EuiFieldText
            value={form.name}
            name="name"
            onChange={handleOnChange}
          />
        </EuiFormRow>
      </EuiFormRow>
      <EuiRadioGroup
        options={anyOrAll}
        idSelected={form.match}
        onChange={(optionId) => {
          setForm((prev) => ({ ...prev, match: optionId }));
        }}
        name="match"
      />
      <EuiPanel className="filter-rules">{filterList}</EuiPanel>
      <div className="action-btns-container">
        <EuiButton
          className="action-btn"
          fill
          onClick={handleSubmit}
          disabled={submiting}
        >
          Save
        </EuiButton>
        <div className="btn-spacer"></div>
        <EuiButton className="action-btn" disabled={submiting}>
          Cancel
        </EuiButton>
      </div>
    </EuiForm>
  );
}
