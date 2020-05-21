import React, { useState, useEffect } from "react";
import { addNewFilter } from "../db/initializeFirestore";
import validateField from "./validation";
import shortid from "shortid";

export default function filterForm(
  initialState,
  user,
  setDashboardView,
  setAllFilterRules
) {
  const [canDeleteRule, setCanDeleteRule] = useState(false);
  /*Filter rules needs its own state because of its volatile nature
  User will edit and modify each rule, so an unique id is needed 
  for each rule as its key. Onsubmit, filterRules will be converted 
  to the right format and be combined with form state*/
  const [filterRules, setFilterRules] = useState(initialState.filter);
  const [form, setForm] = useState(initialState.form);
  const [errors, setErrors] = useState({});
  const [submiting, setSubmiting] = useState(false);
  useEffect(() => console.log(errors), [errors]);

  function handleSubmit(e) {
    e.preventDefault();
    //prevent submiting two times
    setSubmiting(true);
    let errorObj = {};
    //Check if any filter rules are empty
    for (const [id, filter] of filterRules) {
      const fieldError = validateField(id, filter.value);
      errorObj = { ...errorObj, ...fieldError };
    }
    //check if rest of form filled
    for (const [key, value] of Object.entries(form)) {
      const fieldError = validateField(key, value);
      errorObj = { ...errorObj, ...fieldError };
    }
    const isEmptyArray = (arr) => arr.length === 0;
    const noErrors = Object.values(errorObj).every(isEmptyArray);
    if (noErrors) {
      const output = { ...form };
      //merge filterRules into form state by removing unique id of each rule
      //value of rules with the same type are pushed to the same array
      for (let [id, field] of filterRules) {
        if (!output[field.type]) {
          output[field.type] = [];
        }
        output[field.type].push(field.value);
      }
      //use old filterId if editing
      const filterId = initialState.filterId || shortid.generate();
      const finalFilterObj = {
        filters: { [filterId]: { ...output, enabled: true, filterId } },
      };
      setAllFilterRules((prev) => {
        const newMap = new Map(prev);
        newMap.set(filterId, {
          ...output,
          enabled: true,
          filterId,
          uid: user.uid,
        });
        return newMap;
      });

      addNewFilter(user.uid, finalFilterObj)
        .then(setDashboardView(true))
        .catch((e) => console.log(e));
    } else {
      setSubmiting(false);
      setErrors(errorObj);
    }
  }
  // ensure user cannot delete the last filter rule
  useEffect(() => {
    if (filterRules.size <= 1) {
      setCanDeleteRule(false);
    } else {
      setCanDeleteRule(true);
    }
  }, [filterRules]);

  function handleOnChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  }
  function handleBlur(e) {
    const targetId = e.target.name;
    const targetValue = e.target.value;
    const fieldError = validateField(targetId, targetValue);
    setErrors((prev) => ({ ...prev, ...fieldError }));
  }
  function deleteErrorsOnTypeChange(id) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }
  function handleCancel() {
    setDashboardView(true);
  }
  return {
    canDeleteRule,
    deleteErrorsOnTypeChange,
    errors,
    filterRules,
    form,
    handleBlur,
    handleCancel,
    handleOnChange,
    handleSubmit,
    setCanDeleteRule,
    setFilterRules,
    setForm,
    setSubmiting,
    submiting,
  };
}
