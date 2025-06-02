
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutRectangle,
  Pressable,
  Dimensions,
  Platform
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { baseStyles, getDropdownStyles } from './DropDownOverlayManager.style';

interface Option {
  label: string;
  value: string;
}

interface DropdownState {
  list: Option[];
  value: string;
  setValue: (val: string) => void;
  triggerLayout: LayoutRectangle;
  onClose?: () => void;
  variant?: 'default' | 'menu';
}

interface DropdownContextProps {
  showDropdown: (state: DropdownState) => void;
  hideDropdown: () => void;
}

const DropDownOverlayContext = createContext<DropdownContextProps>({
  showDropdown: () => { },
  hideDropdown: () => { },
});

export const useDropdown = () => useContext(DropDownOverlayContext);

type Props = {
  children: ReactNode;
};
export const DropDownOverlayManagerProvider: React.FC<Props> = ({ children }) => {
  const [dropdownState, setDropdownState] = useState<DropdownState | null>(null);
  const stylesVariant = getDropdownStyles(dropdownState?.variant ?? 'default');
  
  const showDropdown = (state: DropdownState) => {
    setDropdownState(state);
  };

  const hideDropdown = () => {
    if (dropdownState?.onClose) {
      dropdownState.onClose();
    }
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
    const padding = dropdownState.variant === 'menu' ? 0 : 20;
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
          <Pressable style={baseStyles.overlay} onPress={hideDropdown}>
            <View
              style={[
                stylesVariant.dropdown,
                {
                  top: dropdownState.variant === 'menu'
                    ? dropdownState.triggerLayout.y +
                    dropdownState.triggerLayout.height -
                    (Platform.OS === 'android' ? 20 : 50)
                    :
                    dropdownState.triggerLayout.y +
                    dropdownState.triggerLayout.height -
                    (Platform.OS === 'android' ? -15 : 20),
                  left: dropdownState.variant === 'menu'
                    ? Math.min(screenWidth - calculatedDropdownWidth - 55)
                    : Math.min(
                      screenWidth - calculatedDropdownWidth - 10,
                      dropdownState.triggerLayout.x + offsetX
                    ),
                  width: calculatedDropdownWidth,
                },
              ]}
            >
              <FlatList
                data={dropdownState.list}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={stylesVariant.item}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        stylesVariant.itemText,
                        item.value === dropdownState.value && stylesVariant.selectedItemText,
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


