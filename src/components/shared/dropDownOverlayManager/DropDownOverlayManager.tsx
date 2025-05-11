
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutRectangle,
  Pressable,
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

export const DropDownOverlayManagerProvider = ({ children }: { children: ReactNode }) => {
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
                  top: dropdownState.triggerLayout.y + dropdownState.triggerLayout.height,
                  left: dropdownState.triggerLayout.x,
                  minWidth: dropdownState.triggerLayout.width,
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