import { useState } from 'react';

export const useFormValidation = (validator) => {
  const [errors, setErrors] = useState({});

  const setValidationError = (field, message) =>
    setErrors((prev) => ({ ...prev, [field]: message }));

  const clearError = (field) => {
    setErrors((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([key]) => key !== field))
    );
  };

  const clearErrors = () => setErrors({});

  const clearErrorsByPrefix = (prefix) =>
    setErrors((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => !key.startsWith(prefix))
      )
    );

  const validateBeforeSave = (formData, onValid) => {
    const validation = validator(formData);

    if (validation) {
      setValidationError(validation.field, validation.message);

      const el = document.querySelector(`[data-field="${validation.field}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus();
      }

      return false;
    }

    clearErrors();
    if (onValid) onValid();
    return true;
  };

  return {
    errors,
    setValidationError,
    clearError,
    clearErrors,
    clearErrorsByPrefix,
    validateBeforeSave,
  };
};
