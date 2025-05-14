import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { styles } from './BaseCalculatorForm.styles';
import { SimpleDropDown } from '../simpleDropdown/SimpleDropdown';
import { cultureList, regionList } from '../calculator/СalculatorData';
import { calculateValue } from '../calculator/Calculator';
import { formCultureUA as ua } from '../../../translations';

interface Props {
  mode: 'area' | 'culture';
  label: string;
}

export const BaseCalculatorForm: React.FC<Props> = ({ mode, label }) => {
  const [culture, setCulture] = useState('');
  const [region, setRegion] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');

  const handleSubmit = () => {
    const normalizedInput = inputValue.replace(/\s/g, '');
    const numericValue = parseFloat(normalizedInput);

    if (!culture || !region) {
      setError(ua.fillAllFields);
    } else if (isNaN(numericValue)) {
      setError(ua.onlyNumberError);
    } else if (numericValue <= 0) {
      setError(ua.positiveNumberError);
    } else {
      const result = calculateValue(culture, region, numericValue, mode);
      if (result === null) {
        setError(ua.calculationError);
      } else {
        setError('');
        setCalculatorResult(`Результат розрахунку: ${result}`);
        return;
      }
    }
    setCalculatorResult('');
  };

  const getErrorStyle = (field: string) => !field && error ? styles.inputError : {};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{ua.titleLabel}</Text>

        <SimpleDropDown
          label={ua.cultureLabel}
          value={culture}
          setValue={setCulture}
          list={cultureList}
          error={!!error && !culture}
        />

        <SimpleDropDown
          label={ua.regionLabel}
          value={region}
          setValue={setRegion}
          list={regionList}
          error={!!error && !region}
        />

        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, getErrorStyle(inputValue)]}
          placeholder={ua.inputPlaceholder}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholderTextColor="#fff"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Keyboard.dismiss();
            handleSubmit();
          }}
        >
          <Text style={styles.buttonText}>{ua.resultBtn}</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {calculatorResult ? <Text style={styles.resultText}>{calculatorResult}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
};