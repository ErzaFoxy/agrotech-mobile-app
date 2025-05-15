import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image
} from 'react-native';
import { styles } from './BaseCalculatorForm.styles';
import { SimpleDropDown } from '../simpleDropdown/SimpleDropdown';
import { cultureList, regionList } from '../calculator/СalculatorData';
import { calculateValue } from '../calculator/Calculator';
import { formCultureUA as ua } from '../../../translations';
import { CalculationResultCard } from "../calculationResultCard/CalculationResultCard";
import IconPlus from "../../../../assets/plus-notes.svg";
import IconPlusActive from "../../../../assets/plus-notes-active.svg";

interface Props {
  mode: 'area' | 'culture';
  label: string;
}

export const BaseCalculatorForm: React.FC<Props> = ({ mode, label }) => {
  const [culture, setCulture] = useState('');
  const [region, setRegion] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [calculatorResult, setCalculatorResult] = useState<{
    inputValue: string;
    result: number;
    culture: string;
    } | null>(null);

  const handleSubmit = () => {
    const normalizedInput = inputValue.replace(/\s/g, '');
    const numericValue = parseFloat(normalizedInput);

    if (!culture || !region || !inputValue) {
      setError(ua.fillAllFields);
    } else if (isNaN(numericValue)) {
      setError(ua.onlyNumberError);
    } else if (numericValue <= 0) {
      setError(ua.positiveNumberError);
    } else {
      const result = calculateValue(culture, region, numericValue, mode);
      if (result === null) {
            setError(ua.calculationError);
            setCalculatorResult(null);
            } else {
            setError('');
            setCalculatorResult({
                inputValue: normalizedInput,
                result,
                culture,
            });
        }
    }
  };

 const IconComponent = isSaved ? IconPlus : (calculatorResult ? IconPlusActive : IconPlus);
 const handleAddToNotes = () => {
  console.log('Зберігаємо розрахунок у нотатки...');
  setIsSaved(true);

  // Очистити форму через 3 секунди
  setTimeout(() => {
    setIsSaved(false);
    setCalculatorResult(null);
    setCulture('');
    setRegion('');
    setInputValue('');
  }, 3000);
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

        {error ? <Text style={styles.errorText}>{error}</Text> :
        (calculatorResult ? 
            <CalculationResultCard
                mode={mode}
                culture={calculatorResult.culture}
                inputValue={calculatorResult.inputValue}
                result={calculatorResult.result}
            />
        : <Text style={styles.futureResult}>{ua.futureResult}</Text>)}

        <View style={styles.noteButtonWrapper}>
          <TouchableOpacity 
              onPress={handleAddToNotes} 
              style={styles.noteButtonTouchable}
              disabled={isSaved}
          >
            {calculatorResult && (<Text style={styles.noteHint}>
              {isSaved ? ua.isSaved : calculatorResult ? ua.addNote : ''}
              </Text>)}
            <IconComponent width={styles.noteButton.width} height={styles.noteButton.height} />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};