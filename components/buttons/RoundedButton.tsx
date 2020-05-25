import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheet,
    Button
} from 'react-native';

import colors from '../../styles/colors';

interface RoundedButtonProps {
    label: string,
    textColor?: string,
    textSize?: string,
    textWeight?: string,
    textAlign?: string,
    background?: string,
    disabled?: boolean,
    //icon: Icon,
    buttonStyle?: any,
    textStyle?: any,
    opacityStyle?: any,
    borderColor?: string,
    onPress?(): void
};

const RoundedButton = (props: RoundedButtonProps) => {
    const {
        label = 'Button',
        textColor = colors.primary,
        textSize = 14,
        textWeight = '500',
        textAlign = 'center',
        background = 'transparent',
        disabled = false,
        buttonStyle = {},
        textStyle = {},
        opacityStyle = {},
        onPress = null,
        borderColor = colors.white
    } = props;

    const opacity = disabled ? 0.5 : 1;

    return(
        <TouchableOpacity
            onPress={(e) => {
                if (!disabled) {
                    e.preventDefault();
                    props.onPress();
                }
            }}
            style={[{opacity}, styles.button, buttonStyle]}
        >
            <Text
                style={[{
                    color: textColor,
                    fontSize: textSize,
                    fontWeight: textWeight,
                    textAlign,
                    backgroundColor: background
                }, textStyle, styles.label]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 50,
        width: "80%",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2AC062',

        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },

    label: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
});

export default RoundedButton;