import React from 'react';
import { Keyboard, Text, Pressable } from 'react-native';
import { render } from '@testing-library/react-native';
import { KeyboardDismissWrapper } from './KeyboardDismissWrapper';

describe('KeyboardDismissWrapper', () => {
    // Проверяет, что при нажатии вне поля ввода вызывается Keyboard.dismiss,
    it('вызывает Keyboard.dismiss при onPress', () => {
        const dismissSpy = jest.spyOn(Keyboard, 'dismiss').mockImplementation(() => { });

        const { UNSAFE_getByType } = render(
            <KeyboardDismissWrapper>
                <Text>Dummy</Text>
            </KeyboardDismissWrapper>
        );

        const pressable = UNSAFE_getByType(Pressable);

        pressable.props.onPress();

        expect(dismissSpy).toHaveBeenCalled();

        dismissSpy.mockRestore();
    });
});