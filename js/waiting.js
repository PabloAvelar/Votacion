import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// Paleta de colores
const palette = {
    darkblue: '#647B85',
    white: '#F8F8F8',
    lightblue: '#B3C7D2',
    favor: '#195B08',
    contra: '#5B0808',
};

const Waiting = () => {
    return (
        <View style={{ backgroundColor: palette.darkblue, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={'spinner'} size={200} style={{ color: palette.lightblue }} />
        </View>
    )
}

export default Waiting;
