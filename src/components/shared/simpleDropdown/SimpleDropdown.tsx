import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import {styles} from './SimpleDropdown.styles'
import { DropdownContext } from '../../layout/LayoutWrapper';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  setValue: (value: string) => void;
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

  const [dropdownWidth, setDropdownWidth] = useState(160);
  const [isOpen, setIsOpen] = useState(false);

  const { setCloseDropdown } = useContext(DropdownContext);

  const selectedLabel = list.find(i => i.value === value)?.label || '...';

  useEffect(() => {
    const getTextWidth = (text: string) => text.length * 9; // 9px на символ
    const maxLabelWidth = Math.max(...list.map(item => getTextWidth(item.label)));
    setDropdownWidth(maxLabelWidth + 30); // + padding
  }, [list]);

  useEffect(() => {
    if (isOpen) {
      setCloseDropdown(() => () => setIsOpen(false));
    }
  }, [isOpen, setCloseDropdown]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (newValue: string) => {
    setValue(newValue);
    setIsOpen(false);
  }


  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={[styles.input, error && styles.inputError]}
          onPress={handleToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.inputText}>{selectedLabel}</Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={[styles.dropdown, { width: dropdownWidth }]}>
            <FlatList
              data={list}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleSelect(item.value);
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.itemText,
                      item.value === value && styles.selectedItemText
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

