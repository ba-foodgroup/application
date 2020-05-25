import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    TextStyle,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextInputSubmitEditingEventData
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Putt i fil over constants?
const CHECKMARK_DEFAULT_SCALE_DURATION = 400;

import colors from '../../styles/colors';

interface InputFieldProps {
    label?: string;
    labelTextSize?: number;
    labelTextWeight?: TextStyle['fontWeight'];
    labelColor?: string;
    textColor?: string;
    inputType: string;
    customStyle?: any;
    inputStyle?: any;
    onChangedText?(text: string): void;
    checkmark?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    borderBottomColor?: string;
    defaultValue?: string | null;
    captureTextState?: boolean;
    value?: string;
    onChange?: (text: string) => void;
    onChangeText?: (text: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onSubmitEditing?: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
}

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    const {
        label,
        labelTextSize = 12,
        labelTextWeight = '600',
        labelColor = colors.primary,
        textColor = colors.primary,
        inputType = 'text',
        customStyle = {},
        inputStyle = {},
        checkmark = false,
        autoFocus = false,
        placeholder = '',
        borderBottomColor = 'transparent',
        defaultValue = null,
        captureTextState = false,
        value = null
    } = props;

    const [hiddenInput, setHiddenInput] = useState(inputType === 'password');
    const [text, setText] = useState(value !== null ? value : '');
    const [scaledCheckmarkValue, setScaledCheckmarkValue] = useState(
        new Animated.Value(0)
    );

    const scaleCheckmark = (value: any) => {
        Animated.timing(scaledCheckmarkValue, {
            toValue: value,
            easing: Easing.ease,
            duration: CHECKMARK_DEFAULT_SCALE_DURATION
        }).start();
    };

    const scaleValue = checkmark ? 1 : 0;
    scaleCheckmark(scaleValue);

    const toggleShowInput = () => {
        setHiddenInput(!hiddenInput);
    };

    const iconScale = scaledCheckmarkValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 1.5, 1]
    });

    return (
        <View style={[customStyle, style.container]}>
            <Text
                style={[
                    {
                        fontWeight: labelTextWeight,
                        color: labelColor,
                        fontSize: labelTextSize
                    },
                    style.label
                ]}
            >
                {label}
            </Text>
            {inputType === 'password' && (
                <TouchableOpacity
                    style={style.showInputButton}
                    onPress={toggleShowInput}
                >
                    <Text style={style.showInputText}>
                        {hiddenInput ? 'Show' : 'Hide'}
                    </Text>
                </TouchableOpacity>
            )}
            <Animated.View
                style={[
                    { transform: [{ scale: iconScale }] },
                    style.checkmarkContainer
                ]}
            >
                <Ionicons
                    name='md-checkmark'
                    color={colors.primaryDark}
                    size={18}
                />
            </Animated.View>
            <TextInput
                style={[
                    {
                        color: textColor,
                        borderBottomColor: borderBottomColor
                    },
                    inputStyle,
                    style.inputField
                ]}
                secureTextEntry={hiddenInput}
                onChangeText={(text) => props.onChange(text)}
                onSubmitEditing={props.onSubmitEditing}
                onBlur={props.onBlur}
                autoFocus={autoFocus}
                keyboardType={
                    inputType === 'email' ? 'email-address' : 'default'
                }
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        display: 'flex'
        // alignItems: "center",
        //justifyContent: "center"
    },
    label: {
        marginBottom: 15
    },
    showInputButton: {
        position: 'absolute',
        right: 0
    },
    showInputText: {
        color: colors.primaryDark,
        fontWeight: '600'
    },
    checkmarkContainer: {
        position: 'absolute',
        right: 0,
        bottom: 20
    },
    inputField: {
        // width: "80%",
        paddingTop: 5,
        marginBottom: 20
    }
});

export default InputField;
