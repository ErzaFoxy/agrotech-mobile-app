import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { BaseCalculatorForm } from './BaseCalculatorForm';
import { formCultureUA as ua } from '../../../translations';
import { NoteRefreshProvider } from '../../../context/noteRefreshContext';


jest.mock('../simpleDropdown/SimpleDropdown', () => {
    const React = require('react');
    const { Text } = require('react-native');
    const { useState, useEffect } = React;
    const { formCultureUA: ua } = require('../../../translations');

    return {
        SimpleDropDown: ({ label, setValue }: any) => {
            const [initialized, setInitialized] = useState(false);

            useEffect(() => {
                if (!initialized) {
                    if (label === ua.cultureLabel) {
                        setValue(ua.cultureWheat);
                    } else if (label === ua.regionLabel) {
                        setValue(ua.regionOdesa);
                    }
                    setInitialized(true);
                }
            }, [initialized, label]);

            return <Text>{label}</Text>;
        },
    };
});

jest.mock('../../../navigation/hooks', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

const renderForm = () =>
    render(
        <NavigationContainer>
            <NoteRefreshProvider>
                <BaseCalculatorForm title="Test Title" mode="culture" label="Test Input" />
            </NoteRefreshProvider>
        </NavigationContainer>
    );

describe('BaseCalculatorForm UI tests', () => {
    it('отображает заголовок и базовые поля', () => {
        const { getByText, getByPlaceholderText } = renderForm();

        expect(getByText('Test Title')).toBeTruthy();
        expect(getByPlaceholderText(ua.inputPlaceholder)).toBeTruthy();
        expect(getByText(ua.resultBtn)).toBeTruthy();
    });

    it('показывает ошибку, если поля пустые при отправке', async () => {
        const { getByText } = renderForm();

        fireEvent.press(getByText(ua.resultBtn));

        await waitFor(() => {
            expect(getByText(ua.fillAllFields)).toBeTruthy();
        });
    });

    it('показывает ошибку, если введено не число', async () => {
        const { getByText, getByPlaceholderText } = renderForm();

        fireEvent.changeText(getByPlaceholderText(ua.inputPlaceholder), 'abc');
        fireEvent.press(getByText(ua.resultBtn));

        await waitFor(() => {
            expect(getByText(ua.onlyNumberError)).toBeTruthy();
        });
    });

    it('показывает ошибку, если введено отрицательное число', async () => {
        const { getByText, getByPlaceholderText } = renderForm();

        fireEvent.changeText(getByPlaceholderText(ua.inputPlaceholder), '-10');
        fireEvent.press(getByText(ua.resultBtn));

        await waitFor(() => {
            expect(getByText(ua.positiveNumberError)).toBeTruthy();
        });
    });

    it('ничего не рендерит, если не было расчёта, но и ошибок нет', () => {
        const { getByText } = renderForm();

        expect(getByText(ua.futureResult)).toBeTruthy();
    });
});