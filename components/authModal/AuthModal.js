import shortid from "shortid";
import React, { useState, useContext } from "react";
import style from "./style.module.scss";

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiRange,
  EuiSwitch,
  EuiCodeBlock,
  EuiSpacer,
  EuiFieldPassword,
} from "@elastic/eui";

import useAuthValidation from "../../hooks/authForm";

export default ({ register, loginEmail, registerEmail }) => {
  const {
    form,
    handleOnChange,
    errors,
    handleBlur,
    handleSubmit,
    submitting,
    closeModal,
    showModal,
    isModalVisible,
  } = useAuthValidation(register, loginEmail, registerEmail);

  const modalForm = (
    <EuiForm>
      <EuiFormRow
        label="Email"
        isInvalid={errors?.email?.length}
        error={errors?.email}
      >
        <EuiFieldText
          name="email"
          value={form?.email}
          isInvalid={errors?.email?.length}
          onChange={handleOnChange}
          onBlur={handleBlur}
        />
      </EuiFormRow>

      <EuiFormRow
        label="Password"
        isInvalid={errors?.password?.length}
        error={errors?.password}
      >
        <EuiFieldPassword
          name="password"
          value={form?.password}
          onChange={handleOnChange}
          onBlur={handleBlur}
        />
      </EuiFormRow>
      {register && (
        <EuiFormRow
          label="Confirm Password"
          isInvalid={errors?.passwordConfirm?.length}
          error={errors?.passwordConfirm}
        >
          <EuiFieldPassword
            name="passwordConfirm"
            value={form?.passwordConfirm}
            isInvalid={errors?.passwordConfirm?.length}
            onChange={handleOnChange}
            onBlur={handleBlur}
          />
        </EuiFormRow>
      )}
      <EuiSpacer size="xl" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiButton
            className={style["primary-btn"]}
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {register ? "Register" : "Login"}
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton className={style["secondary-btn"]} onClick={closeModal}>
            Cancel
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} initialFocus="[name=email]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              {register ? "Register" : "Login"}
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{modalForm}</EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return (
    <div>
      <EuiButton
        onClick={showModal}
        className={register ? style["secondary-btn"] : style["primary-btn"]}
      >
        {register ? "Register" : "Sign In"}
      </EuiButton>
      {modal}
    </div>
  );
};
