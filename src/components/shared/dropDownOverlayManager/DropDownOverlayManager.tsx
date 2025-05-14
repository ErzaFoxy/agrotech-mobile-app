
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutRectangle,
  Pressable,
  Dimensions
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { styles } from './DropDownOverlayManager.style';

interface Option {
  label: string;
  value: string;
}

interface DropdownState {
  list: Option[];
  value: string;
  setValue: (val: string) => void;
  triggerLayout: LayoutRectangle;
}

interface DropdownContextProps {
  showDropdown: (state: DropdownState) => void;
  hideDropdown: () => void;
}

const DropDownOverlayContext = createContext<DropdownContextProps>({
  showDropdown: () => {},
  hideDropdown: () => {},
});

export const useDropdown = () => useContext(DropDownOverlayContext);

type Props = {
  children: ReactNode;
};
export const DropDownOverlayManagerProvider: React.FC<Props> = ({ children }) => {
  const [dropdownState, setDropdownState] = useState<DropdownState | null>(null);

  const showDropdown = (state: DropdownState) => {
    setDropdownState(state);
  };

  const hideDropdown = () => {
    setDropdownState(null);
  };

  const handleSelect = (val: string) => {
    if (dropdownState) {
      dropdownState.setValue(val);
      hideDropdown();
    }
  };

const calculatedDropdownWidth = useMemo(() => {
  if (!dropdownState || dropdownState.list.length === 0) return 0;

  const longestLabel = dropdownState.list.reduce((longest, current) => {
    return current.label.length > longest.label.length ? current : longest;
  }, { label: '', value: '' });

  const approxCharWidth = 11;
  const padding = 20;
  const width = longestLabel.label.length * approxCharWidth + padding;

  return Math.ceil(width);
}, [dropdownState]);

const screenWidth = Dimensions.get('window').width;
const offsetX = screenWidth * 0.45;

  return (
    <DropDownOverlayContext.Provider value={{ showDropdown, hideDropdown }}>
      {children}

      <Portal>
        {dropdownState && (
          <Pressable style={styles.overlay} onPress={hideDropdown}>
            <View
              style={[
                styles.dropdown,
                {
                  top: dropdownState.triggerLayout.y + dropdownState.triggerLayout.height - 20,
                  left: Math.min(screenWidth - calculatedDropdownWidth - 10, dropdownState.triggerLayout.x + offsetX),
                  width: calculatedDropdownWidth,
                },
              ]}
            >
              <FlatList
                data={dropdownState.list}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.itemText,
                        item.value === dropdownState.value && styles.selectedItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Pressable>
        )}
      </Portal>
    </DropDownOverlayContext.Provider>
  );
};