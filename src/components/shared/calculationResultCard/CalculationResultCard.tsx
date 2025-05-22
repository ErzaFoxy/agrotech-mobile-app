import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './CalculationResultCard.styles';
import { cultureList } from '../calculator/CalculatorData';
import { formatTranslation } from '../../../utils/formatTranslation';
import { formCultureUA as ua } from '../../../translations';

interface Props {
  mode: 'area' | 'culture';
  culture: string;      // значення з drop-down (value)
  inputValue: string;   // введене користувачем значення
  result: number;       // число, яке повернув калькулятор
}

export const CalculationResultCard: React.FC<Props> = ({ mode, culture, inputValue, result }) => {
  const selectedCulture = cultureList.find(c => c.value === culture);
  const cultureLabel = selectedCulture?.label || '';
  //const fertilizers = selectedCulture?.fertilizers || '';

  const formatResult = (value: number): string => {
    return value % 1 === 0 ? value.toString() : value.toFixed(5);
  };

  const resultText = mode === 'culture'
    ? formatTranslation(ua.resultTitleCulture, { input: inputValue })
    : formatTranslation(ua.resultTitleArea, { input: inputValue, culture: cultureLabel });

  const valueWithUnit = mode === 'culture'
    ? formatTranslation(ua.resultValueCulture, { value: formatResult(result), culture: cultureLabel })
    : formatTranslation(ua.resultValueArea, { value: formatResult(result) });

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {resultText}
        <Text style={styles.highlight}>{valueWithUnit}</Text>
        {/* {'\n'}Для обробки:{'\n'}
        <Text style={styles.highlight}>{fertilizers}</Text> */}
      </Text>
    </View>
  );
};