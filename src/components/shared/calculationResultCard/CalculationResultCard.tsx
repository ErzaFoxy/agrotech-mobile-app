import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './CalculationResultCard.styles';
import { cultureList } from '../calculator/СalculatorData';

interface Props {
  mode: 'area' | 'culture';
  culture: string;      // значення з drop-down (value)
  inputValue: string;   // введене користувачем значення
  result: number;       // число, яке повернув калькулятор
}

export const CalculationResultCard: React.FC<Props> = ({ mode, culture, inputValue, result }) => {
  const selectedCulture = cultureList.find(c => c.value === culture);
  const cultureLabel = selectedCulture?.label || '';
  const fertilizers = selectedCulture?.fertilizers || '';

  const formatResult = (value: number): string => {
    return value % 1 === 0 ? value.toString() : value.toFixed(5);
  };

  const resultText = mode === 'culture'
    ? `Для посіву на ${inputValue} Га вам необхідно:\n`
    : `Для посіву ${inputValue} кг ${cultureLabel} вам необхідно:\n`;

  const valueWithUnit = mode === 'culture'
    ? `${formatResult(result)} кг ${cultureLabel}`
    : `${formatResult(result)} Га поля`;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {resultText}
        <Text style={styles.highlight}>{valueWithUnit}</Text>
        {'\n'}Для обробки:{'\n'}
        <Text style={styles.highlight}>{fertilizers}</Text>
      </Text>
    </View>
  );
};