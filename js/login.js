import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
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
            email: '',
            password: '',

        };
    }

    render() {
        const verify = () => {
            // Preparando credenciales
            this.setState({email: this.state.email.replace(/ /g, '')});
            this.setState({password: this.state.password.replace(/ /g, '')});

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

                    if(res == '404'){ // Si el usuario no existe
                        Alert.alert("Usuario inexistente", 'Contacta al administrador');
                    }else if(res == '0'){ // Si la contraseña es inválida
                        Alert.alert('Contraseña inválida', 'Asegúrate de ingresar las credenciales válidas');
                    }else if(res == '1'){ // Ingresando como votante
                        _this.props.navigation.navigate("Voting", {email: _this.state.email, password: _this.state.password});
                    }else if(res == 'admin'){
                        _this.props.navigation.navigate("ShowVotes", {email: _this.state.email, password: _this.state.password});
                    }
                }
            };
            xhttp.open("GET", `https://pabloavelar.mx/votacion/login.php?email=${this.state.email}&password=${this.state.password}`, true);
            xhttp.send();
        }

        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Image
                        style={{width: 200, height:200}}
                        source={require('../img/vote.png')}
                    />
                </View>
                <View style={styles.login}>
                    <Text style={styles.txt_title}>Iniciar sesión</Text>
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Icon name={'envelope'} size={20} style={styles.icon} />
                            <TextInput placeholder='Correo' style={{ width: 280, color: palette.darkblue }} onChangeText={email => this.setState({ email })} />
                        </View>

                        <View style={styles.input}>
                            <Icon name={'lock'} size={20} style={styles.icon} />
                            <TextInput placeholder='Contraseña' style={{ width: 280, color: palette.darkblue }} onChangeText={password => this.setState({ password })} />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={verify}>
                            <Text style={{ color: palette.white, fontSize: 20, fontWeight: 'bold' }}>Ingresar</Text>
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

    container:{
        alignItems: 'center',
        marginVertical: "20%"
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
        height: '40%',
        minHeight: 329,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    input: {
        height: 50,
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
        borderRadius: 5
    }

});
