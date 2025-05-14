import React, { useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  View as RNView,
  Keyboard
} from 'react-native';

import { styles } from './SimpleDropdown.styles';
import { useDropdown } from '../dropDownOverlayManager/DropDownOverlayManager';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  setValue: (val: string) => void;
  list: Option[];
  error?: boolean;
}

export const SimpleDropDown: React.FC<Props> = ({
  label,
  value,
  setValue,
  list,
  error,
}) => {
  const inputRef = useRef<RNView>(null);
  const { showDropdown } = useDropdown();

  const selectedLabel = list.find(option => option.value === value)?.label || '...';

  const handleToggle = () => {
    if (!inputRef.current) return;

    inputRef.current.measureInWindow((x, y, width, height) => {
      showDropdown({
        list,
        value,
        setValue,
        triggerLayout: { x, y, width, height },
      });
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          ref={inputRef}
          style={[styles.input, error && styles.inputError]}
          onPress={() => {
            Keyboard.dismiss();
            handleToggle();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.inputText}>{selectedLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};