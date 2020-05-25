import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

interface FloatingLoadingSpinnerProps {
    size?: 'small' | 'large',
    color?: string,
    customStyle?: any
}

const FloatingLoadingSpinner = (props: FloatingLoadingSpinnerProps) => {
    const {
        size = 'large',
        color = colors.white,
        customStyle = {}
    } = props;

    return (
        <View style={[customStyle, style.spinner]}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const style = StyleSheet.create({
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FloatingLoadingSpinner;