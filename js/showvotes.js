import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Finish from './finish';

// Paleta de colores
const palette = {
    darkblue: '#647B85',
    white: '#F8F8F8',
    lightblue: '#B3C7D2'
};

export default class ShowVotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oficios: [],
            index: 0,
            loading: true,
        };
    }

    render() {
        // Copiando la referencia de ShowVotes
        _this = this;
        const getVotes = () => {
            const url = `https://pabloavelar.mx/votacion/retrievevotes.php?email=${this.props.route.params.email}&password=${this.props.route.params.password}`;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Se obtienen todos los registros con votos
                    _this.setState({ oficios: JSON.parse(xhttp.responseText), loading: false });
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }

        const next = () => {
            if (this.state.index <= this.state.oficios.length - 1) {
                console.log(this.state.oficios[this.state.index]["Id"]);
                this.state.index++;
            }

            if (this.state.index == this.state.oficios.length - 1){
                console.log("1");
                // return (
                //     <Finish />
                // )
            }
        }

        // Se llama la primera vez
        getVotes();
        if (this.state.loading) {
            return (<View>
                <Text>cargando...</Text>
            </View>)
        }
        return (
            <View style={styles.root}>
                <View style={{ alignItems: 'center' }}>

                </View>
                <View style={styles.voteFrame}>
                    <Text style={styles.txt_title}>{this.state.oficios[this.state.index]["Id"]}</Text>
                    <View style={styles.form}>
                        <View style={{ ...styles.option, backgroundColor: '#52C85D' }}>
                            <Icon name={'check'} size={20} style={{ ...styles.icon, color: '#195B08' }} />
                            <Text style={{ ...styles.optionText, color: '#195B08' }}>A Favor</Text>
                            <View style={{ ...styles.checkview, backgroundColor: '#195B08' }}>
                                <Text style={styles.number}>
                                    {this.state.oficios[this.state.index]["A_Favor"]}
                                </Text>
                            </View>
                        </View>

                        <View style={{ ...styles.option, backgroundColor: '#C85252' }}>
                            <Icon name={'times'} size={20} style={{ ...styles.icon, color: '#5B0808' }} />
                            <Text style={{ ...styles.optionText, color: '#5B0808' }}>En Contra</Text>
                            <View style={{ ...styles.checkview, backgroundColor: '#5B0808' }}>
                                <Text style={styles.number}>
                                    {this.state.oficios[this.state.index]["En_Contra"]}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.option}>
                            <Icon name={'window-minimize'} size={20} style={styles.icon} />
                            <Text style={styles.optionText}>Abstención</Text>
                            <View style={{ ...styles.checkview, backgroundColor: palette.darkblue }}>
                                <Text style={styles.number}>
                                    {this.state.oficios[this.state.index]["Abstencion"]}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={next}>
                            <Text style={{ color: palette.white, fontSize: 20, fontWeight: 'bold' }}>Siguiente</Text>
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
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionText: {
        color: palette.darkblue,
        marginRight: 0,
        fontWeight: 'bold',
        fontSize: 20,
        width: 113,
    },

    checkview: {
        width: 55,
        height: 55,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

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
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: '15%'
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

    option: {
        height: 80,
        backgroundColor: palette.lightblue,
        color: palette.darkblue,
        width: 280,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.darkblue,
        color: 'white',
        height: 60,
        width: 280,
        borderRadius: 5
    },

    number:{
        fontWeight: 'bold',
        fontSize: 20,
    }

});
