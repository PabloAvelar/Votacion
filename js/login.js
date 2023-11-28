import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


// Paleta de colores
const palette = {
    background: '#e2e3e4',
    form: '#fff',
    title: '#2451a3',
    lightPurple: '#7b85c1',
    button: '#2451a3'
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        };
    }

    render() {

        const verify = () => {
            // Preparando credenciales
            this.setState({ email: this.state.email.replace(/ /g, '') });
            this.setState({ password: this.state.password.replace(/ /g, '') });

            if (this.state.email.trim() === '' || this.state.password.trim() === '') {
                Alert.alert('Campos requeridos', 'Llena todo los campos del formulario.');
                return
            }

            // Copiando la referencia de Login
            const _this = this;

            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    let res = xhttp.responseText;

                    if (res == '404') { // Si el usuario no existe
                        Alert.alert("Usuario inexistente", 'Contacta al administrador');
                    } else if (res == '0') { // Si la contraseña es inválida
                        Alert.alert('Contraseña inválida', 'Asegúrate de ingresar las credenciales válidas');
                    } else if (res == '1') { // Ingresando como votante
                        _this.props.navigation.navigate("Voting", { email: _this.state.email, password: _this.state.password });
                    } else if (res == 'admin') {
                        _this.props.navigation.navigate("ShowVotes", { email: _this.state.email, password: _this.state.password });
                    }
                }
            };
            xhttp.open("GET", `https://pabloavelar.mx/votacion/login.php?email=${this.state.email}&password=${this.state.password}`, true);
            xhttp.send();
        }

        return (
            <View style={styles.root}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/cucei.png')}
                    />
                </View>
                <View style={[styles.login, styles.shadow]}>
                    <Text style={styles.txt_title}>Iniciar sesión</Text>
                    <View style={styles.form}>
                        <View style={[styles.input, styles.shadow]}>
                            <Icon name={'envelope'} size={20} style={styles.icon} />
                            <TextInput placeholder='Correo' style={{ width: 280, color: palette.background }} onChangeText={email => this.setState({ email })} />
                        </View>

                        <View style={[styles.input, styles.shadow]}>
                            <Icon name={'lock'} size={20} style={styles.icon} />
                            <TextInput placeholder='Contraseña' secureTextEntry={true} style={{ width: 280, color: palette.background }} onChangeText={password => this.setState({ password })} />
                        </View>
                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={verify}>
                            <Text style={{ color: palette.form, fontSize: 20, fontWeight: 'bold', }}>Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: palette.background,
        height: '100%',
    },

    login: {
        alignItems: 'center',
        backgroundColor: palette.form,
        height: '100%',
        minHeight: '100%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
    },

    txt_title: {
        color: palette.title,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '10%',
        marginBottom: '5%'
    },

    icon: {
        marginHorizontal: 13,
        color: palette.form
    },

    form: {
        height: '45%',
        minHeight: 329,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    input: {
        height: 50,
        backgroundColor: palette.lightPurple,
        color: palette.background,
        width: 280,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.button,
        height: 60,
        width: 280,
        borderRadius: 5,
        marginTop: '2%'
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '33%'
    },

    logo: {
        transform: [{scaleX: 0.15}, {scaleY: 0.15}]
    },

    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
      },

});
