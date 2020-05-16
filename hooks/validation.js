import { useState, useEffect } from "react";

export default function () {
  const [errors, setErrors] = useState({});
  const [submiting, setSubmiting] = useState(false);

  function validateRules(id, str) {
    setErrors((prev) => ({ ...prev, [id]: [] }));
    if (str.trim().length === 0) {
      setErrors((prev) => {
        const newState = { ...prev };
        newState[id].push("Field cannot be empty");
        return newState;
      });
    }
    if (str.length > 255) {
      setErrors((prev) => {
        const newState = { ...prev };
        newState[id].push("Field contains too many characters");
      });
    }
  }
  function handleBlur(e) {
    const targetId = e.target.name;
    const targetValue = e.target.value;
    validateRules(targetId, targetValue);
  }
  function deleteErrorsOnTypeChange(id) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }
  function validateForm(form) {
    for (const [id, value] of form) {
      validateRules(id, value.value);
    }
  }

  return {
    errors,
    handleBlur,
    deleteErrorsOnTypeChange,
    setSubmiting,
    submiting,
    validateRules
  };
}
