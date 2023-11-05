import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Paleta de colores
const palette = {
    darkblue: '#647B85',
    white: '#F8F8F8',
    lightblue: '#B3C7D2'
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={{ alignItems: 'center', marginVertical: "20%" }}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require('../img/vote.png')}
                    />
                </View>
                <View style={styles.login}>
                    <Text style={styles.txt_title}>Iniciar sesión</Text>
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Icon name={'envelope'} size={20} style={styles.icon} />
                            <TextInput placeholder='Correo' style={{ width: '84%', color: palette.darkblue }} />
                        </View>

                        <View style={styles.input}>
                            <Icon name={'lock'} size={20} style={styles.icon} />
                            <TextInput placeholder='Contraseña' style={{ width: '84%', color: palette.darkblue }} />
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: palette.white, fontSize: 20, fontWeight: 'bold' }}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: '8%' }}>
                        <TouchableOpacity>
                            <Text style={{ color: palette.darkblue}}>También puedes <Text style={{fontWeight: 'bold' }}>registrarte</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: palette.darkblue,
        height: '100%'
    },

    login: {
        alignItems: 'center',
        backgroundColor: palette.white,
        height: '100%',
        minHeight: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    txt_title: {
        color: palette.darkblue,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: '5%'
    },

    icon: {
        marginHorizontal: 13,
        color: palette.darkblue
    },

    form: {
        height: '35%',
        minHeight: '35%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    input: {
        height: 40,
        backgroundColor: palette.lightblue,
        color: palette.darkblue,
        width: 280,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.darkblue,
        color: 'white',
        height: 60,
        width: 280,
        borderRadius: 5,
    }

});
