
import React, { forwardRef, useImperativeHandle } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import { formAuthUA as ua } from '../../translations';

export interface DateInputRef {
  validate: () => boolean;
}

interface Props {
  value: string;
  onChange: (text: string) => void;
  inputStyle: StyleProp<TextStyle>;
  setError: (text: string) => void;
}

export const DateInput = forwardRef<DateInputRef, Props>(({ value, onChange, inputStyle, setError }, ref) => {
  useImperativeHandle(ref, () => ({
    validate: () => {
      const [day, month, year] = value.split('.').map(Number);
      const isValid = value.length === 10 &&
        day >= 1 && day <= 31 &&
        month >= 1 && month <= 12 &&
        year >= 1900 && year <= new Date().getFullYear();

      if (!isValid) setError(ua.invalidDate);
      return isValid;
    },
  }));

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)];
    const formatted = parts.filter(Boolean).join('.');
    onChange(formatted);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      keyboardType="numeric"
      maxLength={10}
      placeholder="дд.мм.рррр"
      style={inputStyle}
    />
  );
});