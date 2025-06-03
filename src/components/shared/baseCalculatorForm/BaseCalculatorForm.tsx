import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native';

import { useNavigation } from '../../../navigation/hooks';
import { styles } from './BaseCalculatorForm.styles';
import { SimpleDropDown } from '../simpleDropdown/SimpleDropdown';
import { cultureList, regionList } from '../calculator/CalculatorData';
import { calculateValue } from '../calculator/Calculator';
import { formCultureUA as ua } from '../../../translations';
import { CalculationResultCard } from "../calculationResultCard/CalculationResultCard";
import { AuthPromptModal } from '../../modals/AuthPromptModal'
import { useSaveNote } from '../../../hooks/useSaveNote';
import { KeyboardDismissWrapper } from "../KeyboardDismissWrapper/KeyboardDismissWrapper";
import { RecommendationPanel } from "../recommendationPanel/RecommendationPanel";
import { GlobalLoader } from '../../shared/globalLoader/GlobalLoader';

import IconPlus from "../../../../assets/plus-notes.svg";
import IconPlusActive from "../../../../assets/plus-notes-active.svg";

interface Props {
  title: string;
  mode: 'area' | 'culture';
  label: string;
}

export const BaseCalculatorForm: React.FC<Props> = ({ title, mode, label }) => {
  const [culture, setCulture] = useState('');
  const [region, setRegion] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [calculatorResult, setCalculatorResult] = useState<{
    inputValue: string;
    result: number;
    culture: string;
  } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [textNote, setTextNote] = useState('');

  const navigation = useNavigation();

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
        setTextNote(ua.addNote);
      }
    }
  };

  const IconComponent = isSaved ? IconPlus : (calculatorResult && !error ? IconPlusActive : IconPlus);
  const { saveNote, cancelNoteTimeout } = useSaveNote();
  const resetForm = () => {
    setCalculatorResult(null);
    setCulture('');
    setRegion('');
    setInputValue('');
    setError('');
    setTextNote('');
  };

  const handleAddToNotes = () => {
    if (isSaving) return; // уже сохраняем — игнорируем повторный клик

    if (!calculatorResult || error) {
      console.log('no calc result');
      setTextNote(ua.doCalc);
      return;
    }

    setIsSaving(true);

    saveNote({
      culture,
      region,
      inputValue,
      result: calculatorResult.result,
      mode,
      resetForm: () => {
        resetForm();
        setIsSaving(false); // сброс после очистки формы
      },
      setError,
      setIsSaved,
      openAuthModal: () => {
        setIsSaving(false); // в случае, если неавторизован
        setShowAuthModal(true);
      },
    });
  };

  useEffect(() => {
    return () => {
      cancelNoteTimeout();
      setIsSaving(false);
    };
  }, []);

  const getErrorStyle = (field: string) => !field && error ? styles.inputError : {};


  return (


    <ScrollView
      contentContainerStyle={{ paddingBottom: 32 }}

      showsVerticalScrollIndicator={true}
      persistentScrollbar
      scrollEnabled
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <KeyboardDismissWrapper>
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
          {/* Локальний прелодер поверх форми */}
          {isSaving && (
            <View style={styles.overlay}>
              <GlobalLoader visible={true} leavesStyle={{ bottom: '35%' }} />
            </View>
          )}
        </KeyboardDismissWrapper>

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
            disabled={isSaved || isSaving}
          >
            <Text style={styles.noteHint}>
              {isSaved ? ua.isSaved : textNote}
            </Text>
            <IconComponent width={styles.noteButton.width} height={styles.noteButton.height} />
          </TouchableOpacity>
        </View>
      </View>
      <RecommendationPanel />

      <AuthPromptModal
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegister={() => {
          setShowAuthModal(false);
          navigation.navigate('Register');
        }}
        onLogin={() => {
          setShowAuthModal(false);
          navigation.navigate('Login');
        }}
      />

    </ScrollView>

  );
};