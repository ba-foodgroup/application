import 'react-native-gesture-handler';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './redux/store/store';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import ForumHomeScreenNavigator from './screens/home/ForumHomeNavigator';

import UserProfileScreen from './screens/profile/UserProfileScreen';
import PostWizardScreen from './screens/post/PostWizardScreen';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/login/RegisterScreen';
import ForumPostOverviewScreen from './screens/post/ForumPostOverviewScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        // Global Redux store
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='HomeScreen' headerMode="none">
                        <Stack.Screen
                            name='LoginScreen'
                            component={LoginScreen}
                        />
                        <Stack.Screen
                            name='RegisterScreen'
                            component={RegisterScreen}
                        />
                        <Stack.Screen
                            name='ForumHomeScreen'
                            component={ForumHomeScreenNavigator}
                        />
                        <Stack.Screen
                            name='PostWizardScreen'
                            component={PostWizardScreen}
                        />
                        <Stack.Screen
                            name='UserProfileScreen'
                            component={UserProfileScreen}
                        />
                        <Stack.Screen
                            name='ForumPostOverviewScreen'
                            component={ForumPostOverviewScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
