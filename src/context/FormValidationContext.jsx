import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FormValidationContext = createContext();

export function FormValidationProvider({ children }) {
  const [error, setError] = useState(null);

  const setValidationError = (field, message) => {
    setError({ field, message });
  };

  const clearError = (field) => {
    if (error?.field === field) {
      setError(null);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <FormValidationContext.Provider
      value={{
        error,
        setValidationError,
        clearError,
        clearErrors,
      }}
    >
      {children}
    </FormValidationContext.Provider>
  );
}

FormValidationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useFormValidationContext() {
  return useContext(FormValidationContext);
}
