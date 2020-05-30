import { useState, useEffect } from "react";
import shortid from "shortid";
import axios from "axios";
import InputLine from "../InputLine/InputLine";
import useFilterForm from "../../hooks/useFilterForm";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

import style from "./style.module.scss";

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
export default function ({
  genres,
  setDashboardView,
  setAllFilterRules,
  editState,
}) {
  const { user } = useFirebaseAuth();
  const {
    canDeleteRule,
    deleteErrorsOnTypeChange,
    errors,
    filterRules,
    form,
    handleBlur,
    handleCancel,
    handleOnChange,
    handleSubmit,
    setFilterRules,
    setForm,
    submiting,
  } = useFilterForm(
    editState || {
      form: { name: "", match: "all" },
      filter: new Map([["lxkl8gj", { type: "cast", value: "" }]]),
    },
    user,
    setDashboardView,
    setAllFilterRules
  );

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
    <EuiForm component="form" className={style["filter-form"]}>
      <EuiFormRow>
        <EuiFormRow
          label="Filter Name"
          error={errors.name}
          isInvalid={errors?.name && errors?.name?.length > 0}
        >
          <EuiFieldText
            value={form.name}
            name="name"
            onChange={handleOnChange}
            onBlur={handleBlur}
            isInvalid={errors?.name && errors?.name?.length > 0}
          />
        </EuiFormRow>
      </EuiFormRow>
      {/* Eui radio has no browser style onChange event */}
      <EuiRadioGroup
        options={anyOrAll}
        idSelected={form.match}
        name="match"
        onChange={(optionId) => {
          setForm((prev) => ({ ...prev, match: optionId }));
        }}
        name="match"
      />
      <EuiPanel className={style["filter-rules"]}>{filterList}</EuiPanel>
      <div className={style["action-btns-container"]}>
        <EuiButton
          className={style["action-btn"]}
          fill
          onClick={handleSubmit}
          disabled={submiting}
        >
          Save
        </EuiButton>
        <div className={style["btn-spacer"]}></div>
        <EuiButton
          className={style["action-btn"]}
          disabled={submiting}
          onClick={handleCancel}
        >
          Cancel
        </EuiButton>
      </div>
    </EuiForm>
  );
}
