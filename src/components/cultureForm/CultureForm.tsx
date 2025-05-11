import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SimpleDropDown } from '../shared/simpleDropdown/SimpleDropdown';
import { styles } from './CultureForm.styles';
import { formCultureUA as ua } from '../../translations';

export const CultureForm = () => {
    const [culture, setCulture] = useState('');
    const [region, setRegion] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const cultureList = [
        { label: ua.cultureWheat, value: 'wheat' },
        { label: ua.cultureCorn, value: 'corn' },
        { label: ua.cultureSoy, value: 'soy' },
      ];
    
      const regionList = [
        { label: ua.regionKyiv, value: 'kyiv' },
        { label: ua.regionLviv, value: 'lviv' },
        { label: ua.regionOdesa, value: 'odesa' },
      ];

      
      const handleSubmit = () => {
        const normalizedInput = inputValue.replace(/\s/g, '');
        const numericValue = parseFloat(normalizedInput);

        if (!culture || !region || isNaN(numericValue) || numericValue <= 0) {
          setError(ua.fillAllFields);
          return;
        }

        setError('');
        console.log('Submitted:', { culture, region, inputValue });
      };


      const getErrorStyle = (field: string) => !field && error ? styles.inputError : {};


      return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View style={styles.container}>
              <Text style={styles.title}>{ua.titleLabel}</Text>
              <View style={{ zIndex: 2 }}>
                <SimpleDropDown
                  label={ua.cultureLabel}
                  value={culture}
                  setValue={setCulture}
                  list={cultureList}
                  error={!!error && !culture}
                />
              </View>

              <View style={{ zIndex: 1 }}>
                <SimpleDropDown
                  label={ua.regionLabel}
                  value={region}
                  setValue={setRegion}
                  list={regionList}
                  error={!!error && !region}
                />
              </View>

              <TextInput
                  style={[styles.input, getErrorStyle(inputValue)]}
                  placeholder={ua.inputLabel}
                  value={inputValue}
                  onChangeText={setInputValue}
                  keyboardType="numeric"
                  placeholderTextColor="#666"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>{ua.resultBtn}</Text>
              </TouchableOpacity>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </KeyboardAvoidingView>
      )
}