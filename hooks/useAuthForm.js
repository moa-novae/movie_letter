import { useState, useEffect } from "react";

export default function (register, loginEmail, registerEmail) {
  const [form, setForm] = useState();
  const [errors, setErrors] = useState();
  const [submitting, setSubmitting] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  function handleOnChange(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setForm((prev) => ({ ...prev, [targetName]: targetValue }));
  }
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function validateAuth(type, value) {
    const errorObj = { [type]: [] };
    if (!value) {
      errorObj[type].push("Field cannot be empty");
      return errorObj;
    }
    if (value.length > 255) {
      errorObj[type].push("Too many characters");
    }
    if (type === "email") {
      //check if email format
      if (!validateEmail(value)) {
        errorObj[type].push("A valid email address is needed");
      }
    }
    if (type === "password") {
      if (value.length < 6) {
        errorObj[type].push("Password is too short");
      }
    }
    if (type === "passwordConfirm") {
      if (value.length < 6) {
        errorObj[type].push("Password is too short");
      }
      if (value !== form.password) {
        errorObj[type].push("Passwords do not match");
      }
    }
    return errorObj;
  }
  function handleBlur(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    const errorMsg = validateAuth(targetName, targetValue);
    setErrors((prev) => ({ ...prev, ...errorMsg }));
  }

  function handleSubmit() {
    //validate all on submit
    let newErrors;
    for (const [type, value] of Object.entries(form)) {
      const errorMsg = validateAuth(type, value);
      newErrors = { ...newErrors, ...errorMsg };
    }
    setErrors(newErrors);
    setSubmitting(true);
  }
  useEffect(() => {
    if (submitting) {
      const arrIsEmpty = (arr) => arr.length === 0;
      const noErrors = Object.values(errors).every(arrIsEmpty);
      if (noErrors && register) {
        registerEmail(form.email, form.password)
          .then(() => {
            setSubmitting(false);
            closeModal();
          })
          .catch((e) => {
            if (e.code === "auth/email-already-in-use") {
              setErrors((prev) => {
                const newState = { ...prev };
                newState.email.push("Email is already taken");
                return newState;
              });
            }
            setSubmitting(false);
          });
      } else if (noErrors && !register) {
        loginEmail(form.email, form.password)
          .then(() => {
            setSubmitting(false);
            closeModal();
          })
          .catch((e) => {
            if (e.code === "auth/user-not-found") {
              setErrors((prev) => {
                const newState = { ...prev };
                newState.email.push("User not found");
                return newState
              });
              setSubmitting(false);
            }
            if (e.code === "auth/wrong-password") {
              setErrors((prev) => {
                const newState = { ...prev };
                newState.password.push("Wrong password");
                return newState
              });
              setSubmitting(false);
            }
            setSubmitting(false);
          });
      }
    }
  }, [errors]);
  return {
    form,
    errors,
    handleOnChange,
    handleBlur,
    handleSubmit,
    submitting,
    isModalVisible,
    closeModal,
    showModal,
  };
}
