import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Finish from './components/finish';
import Waiting from './components/waiting';
import firestore from '@react-native-firebase/firestore';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Paleta de colores
const palette = {
  darkblue: '#2451a3',
  white: '#F8F8F8',
  lightpurple: '#9fa4d2',
  darkpurple: '#54559e',
  favor: '#195B08',
  contra: '#5B0808',
  lightfavor: '#52C85D',
  lightcontra: '#C85252'
};

// Paleta de colores
// const palette = {
//   background: '#e2e3e4',
//   form: '#fff',
//   title: '#2451a3',
//   lightPurple: '#7b85c1',
//   button: '#2451a3'
// };

const Voting = () => {
  const [oficios, setOficios] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingVote, setLoadingVote] = useState(false);
  const [vote, setVote] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Función para obtener los datos en tiempo real
  async function getRTData() {
    // Suscriptor que lee en tiempo real

  };

  useEffect(() => {
    // Llamar a la función getRTData aquí si es necesario
    let aux = '';
    const prevoficio = oficios;
    const subscriber = firestore().collection("CurrentRecord").onSnapshot(querySnapshot => {
      querySnapshot.forEach(oficio => {
        aux = oficio.data()['Current'];
        if (prevoficio !== aux) {
          console.log("puedes votar otra vez");
          setOficios(aux);

          // ASDASDAS
          setHasVoted(false)
        }

        // Si ya se ha terminado la votación
        setIsFinished( aux==1 ? true : false );

      })

    })

    return () => subscriber();
  }, []);

  const getOficioDocument = () => {
    // Cambiando el caracter / por el - porque así están los documentos
    return oficios.replace('/', '-');
  }

  const showToast = (title, desc) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: desc
    });
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: vote === 1 ? palette.lightfavor : vote === 2 ? palette.lightcontra : palette.lightpurple }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 20,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    )
  }

  async function toVote() {
    if (vote == 0) return;
    if (hasVoted) return showToast('Ya has votado', 'Espera la siguiente acta');

    try {

      const oficioDocument = getOficioDocument();
      const increment = firestore.FieldValue.increment(1); // Cosa que se usa para incrementar que loco bro
      const db = firestore()
        .collection("CurrentRecord")
        .doc('Record');

      switch (vote) {
        case 1: // A favor
          await db.update({
            A_Favor: increment
          });
          break;
        case 2: // En contra
          await db.update({
            En_Contra: increment
          });
          break;
        case 3: // Abstencion
          await db.update({
            Abstencion: increment
          });
          break;
      }
      console.log("Se ha registrado el voto: " + vote);

      // Bloqueando el que voten una vez más
      setHasVoted(true);

      // Muestra alerta bonita
      showToast('Voto registrado', `¡Has votado ${vote === 1 ? 'a favor' : vote === 2 ? 'en contra' : 'por abstenerte'}!`);

    } catch (e) {
      console.log("Error al votar: " + e);
    }
  };

  const checkvotes = (getVote) => {
    return vote === getVote;
  };

  if (isFinished) {
    return (
      <Finish />
    )
  }

  return (
    <View style={styles.root}>
      <View style={{ alignItems: 'center' }}>

      </View>
      <View style={styles.voteFrame}>
        <Text style={styles.txt_title}>{oficios}</Text>
        <View style={styles.form}>

          <View style={{ ...styles.option, backgroundColor: palette.lightfavor }}>
            <Icon name={'check'} size={20} style={{ ...styles.icon, color: palette.favor }} />
            <Text style={{ ...styles.optionText, color: palette.favor }}>A Favor</Text>
            <View style={{ ...styles.checkview, backgroundColor: palette.favor }}>
              <BouncyCheckbox
                size={55}
                fillColor={palette.favor}
                unfillColor={palette.favor}
                disableBuiltInState={true}
                onPress={() => {
                  if (!hasVoted) setVote(1)
                  console.log("Setting vote to: " + vote);
                }}
                isChecked={checkvotes(1)}
              />

            </View>
          </View>

          <View style={{ ...styles.option, backgroundColor: palette.lightcontra }}>
            <Icon name={'times'} size={20} style={{ ...styles.icon, color: palette.contra, }} />
            <Text style={{ ...styles.optionText, color: palette.contra, }}>En Contra</Text>
            <View style={{ ...styles.checkview, backgroundColor: palette.contra, }}>
              <BouncyCheckbox
                size={55}
                fillColor={palette.contra}
                unfillColor={palette.contra}
                disableBuiltInState={true}
                onPress={() => {
                  if (!hasVoted) setVote(2)
                }}
                isChecked={checkvotes(2)}
              />
            </View>
          </View>

          <View style={styles.option}>
            <Icon name={'window-minimize'} size={20} style={styles.icon} />
            <Text style={styles.optionText}>Abstención</Text>
            <View style={{ ...styles.checkview, backgroundColor: palette.darkblue }}>
              <BouncyCheckbox
                size={55}
                fillColor={palette.darkpurple}
                unfillColor={palette.darkpurple}
                disableBuiltInState={true}
                onPress={() => {
                  if (!hasVoted) setVote(3)
                  console.log("Setting vote to: " + vote);

                }}
                isChecked={checkvotes(3)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={toVote}>
            <Text style={{ color: palette.white, fontSize: 20, fontWeight: 'bold' }}>Votar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast config={toastConfig} />
    </View>
  );
};


const styles = StyleSheet.create({
  root: {
    backgroundColor: palette.darkblue,
    height: '100%',
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
  }

});

export default Voting;