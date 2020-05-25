import { AsyncStorage } from 'react-native';

export const setItem = async (key: string, value: string) => {
    if (window.localStorage === undefined) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    } else {
        localStorage.setItem(key, value);
    }
};

export const getItem = async (key: string) => {
    if (window.localStorage === undefined) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(error);
        }
    } else {
        return localStorage.getItem(key);
    }
};

export const getAPIToken = () => getItem('auth');
