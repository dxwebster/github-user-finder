import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { INPUT_ERROR, INPUT_FILLED, INPUT_FOCUSED } from '../../constants/validation';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const [validation, setValidation] = useState('');
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => (ref.current.value = value),
      clearValue: (ref) => (ref.current.value = '')
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) setValidation(INPUT_ERROR);
  }, [error]);

  const handleInputFocus = useCallback(() => {
    setValidation(INPUT_FOCUSED);
  }, []);

  const handleInputBlur = useCallback(() => {
    setValidation('');

    if (inputRef.current?.value) setValidation(INPUT_FILLED);
  }, []);

  return (
    <Container validation={validation}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && validation === 'isErrored' && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
}
