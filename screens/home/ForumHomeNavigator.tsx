import React from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../styles/colors';
import ForumHomeScreen from './ForumHomeScreen';
import PostWizardScreen from '../post/PostWizardScreen';
import UserProfileScreen from '../../screens/profile/UserProfileScreen';

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const TestComponent: React.FC = () => {
    return (
        <View>
            <Text>Test Component</Text>
        </View>
    );
};

const TestDrawer: React.FC = () => {
    return (
        <View>
            <Text>TEST DRAWER</Text>
            <Text>TEST DRAWER</Text>
            <Text>TEST DRAWER</Text>
        </View>
    );
};

const DrawerForumHomeScreenNavigator: React.FC = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name='Home' component={ForumPagesScreenNavigator} />
            <Drawer.Screen name='Overview' component={TestDrawer} />
            <Drawer.Screen name='Profile' component={UserProfileScreen} />
        </Drawer.Navigator>
    );
};

const ForumPagesScreenNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 11 },
                inactiveTintColor: colors.white, //todo:greyLight
                activeTintColor: colors.white,
                style: {
                    // backgroundColor: colors.primaryDark
                    //TODO: Finn endelig farge
                    backgroundColor: '#27ae60'
                },
                keyboardHidesTabBar: true
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name == 'Front Page') {
                        iconName = 'md-home';
                    } else if (route.name == 'Communities') {
                        iconName = 'md-apps';
                    } else if (route.name == 'Post') {
                        iconName = 'md-add';
                    } else {
                        iconName = 'md-bug';
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                }
            })}
        >
            <BottomTab.Screen
                name='Front Page'
                component={ForumHomeScreenNavigator}
            />
            <BottomTab.Screen name='Communities' component={TestComponent} />
            <BottomTab.Screen name='Post' component={PostWizardScreen} />
        </BottomTab.Navigator>
    );
};

const ForumHomeScreenNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 12 },
                inactiveTintColor: colors.grayLight, //todo: grayLight
                activeTintColor: colors.black,
                style: {
                    // backgroundColor: colors.primaryDark //TODO:
                    marginTop: StatusBar.currentHeight
                }
            }}
        >
            <Tab.Screen name='Home 1' component={ForumHomeScreen} />
            <Tab.Screen name='Home 2' component={TestComponent} />
            <Tab.Screen name='Home 3' component={TestComponent} />
        </Tab.Navigator>
    );
};

export default DrawerForumHomeScreenNavigator;
