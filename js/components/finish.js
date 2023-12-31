import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


// Paleta de colores
const palette = {
    darkblue: '#2451a3',
    white: '#F8F8F8',
    lightpurple: '#9fa4d2',
    darkpurple: '#54559e',
  };

const Finish = () => {

    return (
        <View style={styles.root}>
            <View style={{ alignItems: 'center' }}>

            </View>
            <View style={styles.voteFrame}>
                <View style={{ marginTop: '20%', height: '60%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Text style={styles.txt_title}>La votación {'\n'}ha finalizado</Text>
                    <Icon name={'check-circle'} size={200} style={{ ...styles.icon, color: palette.darkblue }} />

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: palette.darkblue,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // circle:{
    //     width: 186,
    //     height: 186,
    //     backgroundColor: palette.darkblue
    // },

    voteFrame: {
        alignItems: 'center',
        backgroundColor: palette.white,
        height: 754,
        minHeight: 754,
        width: 377,
        borderRadius: 20
    },

    txt_title: {
        color: palette.darkblue,
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: '15%',
        textAlign: 'center',
        lineHeight: 65
    },

    icon: {
        marginHorizontal: 13,
        color: palette.darkblue,
    },

    form: {
        height: '70%',
        minHeight: '55%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

});

export default Finish;