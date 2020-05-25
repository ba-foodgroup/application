import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextStyle,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';

interface ClickableTextProps {
    label: string,
    labelTextSize?: number,
    labelTextWeight?: TextStyle["fontWeight"],
    labelColor?: string,
    textStyle?: any,
    opacityStyle?: any,
    viewStyle?: any,
    marginTop?: number,
    marginBottom?: number,
    onClick?(): void
}

const ClickableText = (props: ClickableTextProps) => {
    const {
        label,
        labelTextSize = 12,
        labelTextWeight = '600',
        labelColor = colors.primary,
        textStyle = {},
        opacityStyle = {},
        viewStyle = {},
        marginTop = 10,
        marginBottom = 10,
        onClick = null
    } = props;

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[{
                marginTop,
                marginBottom
            }, opacityStyle]}
        >
            <View
                style={viewStyle}
            >
                <Text
                    style={[{
                        fontSize: labelTextSize,
                        fontWeight: labelTextWeight,
                        color: labelColor
                    }, textStyle]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const defaultStyle = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10
    }
})

export default ClickableText;