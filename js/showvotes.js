import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Waiting from './components/waiting';
import Finish from './components/finish';
import firestore from '@react-native-firebase/firestore';

// Paleta de colores
const palette = {
    darkblue: '#2451a3',
    white: '#F8F8F8',
    lightblue: '#B3C7D2',
    lightpurple: '#9fa4d2',
    darkpurple: '#54559e',
    favor: '#195B08',
    contra: '#5B0808',
    lightfavor: '#52C85D',
    lightcontra: '#C85252'
};

const ShowVotes = () => {

    const [oficios, setOficios] = useState([]);
    const [currentOficio, setCurrentOficio] = useState({});
    const [index, setIndex] = useState(0);
    const [loadingOficios, setLoadingOficios] = useState(true)
    const [loadingCurrent, setLoadingCurrent] = useState(true)
    const [isFinished, setIsFinished] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        // Obteniendo toda la lista de oficios
        firestore()
            .collection('OFICIOS')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    setOficios(prev => [...prev, doc.data()['Id']])
                });

                // Indicando que ya han sido traidas todas las actas
                setLoadingOficios(false)

            })
            .catch(err => {
                console.log("Error al obtener los documentos: ", err);
            })


        // Escuchando votos en el oficio actual

        const subscriber = firestore()
            .collection('CurrentRecord')
            .onSnapshot(querySnapshot => {
                const aux = [];
                querySnapshot.forEach(oficio => {
                    aux.push({
                        ...oficio.data()
                    });
                });

                // Ordenando el arreglo de oficios
                setCurrentOficio(aux.sort((a, b) => (a.Id > b.Id) ? 1 : -1))
                setLoadingCurrent(false);
                console.log("o");

            });

        
        return () => subscriber();
    }, []);

    function updateCurrentRecord(nextOficio) {

        try {

            firestore()
                .collection("CurrentRecord")
                .doc('Record')
                .update({
                    'Current': nextOficio,
                    'A_Favor': 0,
                    'En_Contra': 0,
                    'Abstencion': 0
                })
                .then(() => {
                    console.log("Current Record was updated");
                });
        } catch (e) {
            console.error("error al actualizar el acta actual", e)
        }
    }

    const next = () => {
        // setIndex((prev) => prev+1)
        if (index <= oficios.length - 2) {
            console.log(`${index + 1}/${oficios.length}`);
            // console.log(oficios[index]["Id"]);
            console.log("indice de cagada: " + index)

            if (index < oficios.length - 1) { // Para seguir avanzando
                updateCurrentRecord(oficios[index + 1]);
            }

            setIndex(index + 1)
        }

        if (index > oficios.length - 2) {
            console.log("SE HA TERMINADO LA VOTACION");

            // Para indicarles a los votantes que ha terminado la votación
            updateCurrentRecord('1');
            setIsFinished(true);
        }
    }

    // Pantalla de finalización
    if (isFinished) {
        return (
            <Finish />
        )
    }

    // Pantalla de carga de espera
    if (loadingOficios || loadingCurrent) {
        console.log("[cargando...]");
        return (
            <Waiting />
        )
    }

    if(!loadingOficios && !isVoting){
        updateCurrentRecord(oficios[0]);
        setIsVoting(true)
    }

    return (
        <View style={styles.root}>
            <View style={styles.voteFrame}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/cucei.png')}
                    />
                </View>
                <View style={styles.form}>
                    {/* Votos a favor */}
                    <View style={{ ...styles.option, backgroundColor: '#52C85D' }}>
                        <Icon name={'check'} size={20} style={{ ...styles.icon, color: '#195B08' }} />
                        <Text style={{ ...styles.optionText, color: '#195B08' }}>A Favor</Text>
                        <View style={{ ...styles.checkview, backgroundColor: '#195B08' }}>
                            <Text style={styles.number}>
                                {currentOficio[0]['A_Favor']}
                            </Text>
                        </View>
                    </View>

                    {/* Votos en contra */}
                    <View style={{ ...styles.option, backgroundColor: '#C85252' }}>
                        <Icon name={'times'} size={20} style={{ ...styles.icon, color: '#5B0808' }} />
                        <Text style={{ ...styles.optionText, color: '#5B0808' }}>En Contra</Text>
                        <View style={{ ...styles.checkview, backgroundColor: '#5B0808' }}>
                            <Text style={styles.number}>
                                {currentOficio[0]['En_Contra']}
                            </Text>
                        </View>
                    </View>

                    {/* Votos abstención */}
                    <View style={styles.option}>
                        <Icon name={'window-minimize'} size={20} style={styles.icon} />
                        <Text style={styles.optionText}>Abstención</Text>
                        <View style={{ ...styles.checkview, backgroundColor: palette.darkpurple }}>
                            <Text style={styles.number}>
                                {currentOficio[0]['Abstencion']}
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

const styles = StyleSheet.create({
    root: {
        backgroundColor: palette.darkblue,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionText: {
        color: palette.darkpurple,
        marginRight: 0,
        fontWeight: 'bold',
        fontSize: 16,
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
        // height: 754,
        // minHeight: 754,
        // width: 377,
        height: '100%',
        borderRadius: 20
    },

    icon: {
        marginHorizontal: 13,
        color: palette.darkpurple,
    },

    form: {
        height: '70%',
        minHeight: '55%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    option: {
        height: 80,
        backgroundColor: palette.lightpurple,
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

    number: {
        fontWeight: 'bold',
        fontSize: 20,
        color: palette.white
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '23%'
    },

    logo: {
        transform: [{ scaleX: 0.13 }, { scaleY: 0.13 }]
    },

});

export default ShowVotes;