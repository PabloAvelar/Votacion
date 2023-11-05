import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './login';
import Signup from './signup';

export default class Stack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        );
    }
}
