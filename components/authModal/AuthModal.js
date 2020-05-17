import shortid from "shortid";
import React, { useState } from "react";
import "./style.scss";

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
import { auth } from "firebase";

export default ({ signIn, register }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const signInForm = (
    <EuiForm>
      <EuiFormRow label="Email">
        <EuiFieldText name="email" />
      </EuiFormRow>

      <EuiFormRow label="Password">
        <EuiFieldPassword name="password" />
      </EuiFormRow>
      <EuiSpacer size='xl'/>
      <EuiFlexGroup alignItems='center'>
        <EuiFlexItem>
          <EuiButton className="primary-btn" type="submit">
            Sign In
          </EuiButton>
        </EuiFlexItem>
      
        <EuiFlexItem>
          <EuiButton className="secondary-btn" onClick={closeModal}>
            Cancel
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );
  const registerForm = (
    <EuiForm>
      <EuiFormRow label="Email">
        <EuiFieldText name="email" />
      </EuiFormRow>

      <EuiFormRow label="Password">
        <EuiFieldPassword name="password" />
      </EuiFormRow>
      <EuiFormRow label="Confirm Password">
        <EuiFieldPassword name="passwordConfirm" />
      </EuiFormRow>
      <EuiSpacer size='xl'/>
      <EuiFlexGroup alignItems='center'>
        <EuiFlexItem>
          <EuiButton className="primary-btn" type="submit">
            Register
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton className="secondary-btn" onClick={closeModal}>
            Cancel
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  let modal;

  if (isModalVisible && signIn) {
    modal = (
      <EuiOverlayMask className="auth-modal">
        <EuiModal onClose={closeModal} initialFocus="[name=email]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Sign In</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{signInForm}</EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  if (isModalVisible && register) {
    modal = (
      <EuiOverlayMask className="auth-modal">
        <EuiModal onClose={closeModal} initialFocus="[name=email]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Register</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{registerForm}</EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return (
    <div>
      <EuiButton
        onClick={showModal}
        className={signIn ? "primary-btn" : "secondary-btn"}
      >
        {signIn ? "Sign In" : "Register"}
      </EuiButton>

      {modal}
    </div>
  );
};
