import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Finish from './finish';
import Waiting from './waiting';

// Paleta de colores
const palette = {
  darkblue: '#647B85',
  white: '#F8F8F8',
  lightblue: '#B3C7D2',
  favor: '#195B08',
  contra: '#5B0808',
};

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oficios: [],
      index: 0,
      loading: true,
      loadingVote: false,
      vote: 0,
      isFinished: false

    };
  }

  render() {
    // Copiando la referencia de ShowVotes
    _this = this;

    const getOficios = () => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Se obtienen todos los registros con votos
          _this.setState({ oficios: JSON.parse(xhttp.responseText), loading: false });
        }
      };
      xhttp.open("GET", `https://pabloavelar.mx/votacion/retrievecertificates.php`, true);
      xhttp.send();

    }

    const sendVote = () => {
      // Iniciando la espera hasta que se registre el voto
      this.setState({ loadingVote: true });

      const email = this.props.route.params.email;
      const password = this.props.route.params.password;

      console.log("Correo: ", email);
      console.log("Pass", password);

      let url = `https://pabloavelar.mx/votacion/sendvote.php?email=${email}&password=${password}&oficio=${this.state.oficios[this.state.index]}&vote=${this.state.vote}`;

      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Se obtienen todos los registros con votos
          console.log("Enviando voto: " + _this.state.vote);
          console.log("respuesta: " + xhttp.responseText);

          if (xhttp.responseText != '1') {
            Alert.alert("Error al registrar voto", "Contacta al administrador.");
          }

          // Una vez que cargue el voto, se termina la espera
          _this.setState({ loadingVote: false });
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();

    }

    const next = () => {
      if (this.state.vote != 0) {
        console.log(`${this.state.index + 1}/${this.state.oficios.length}`);
        if (this.state.index <= this.state.oficios.length - 1) {
          // Envia el voto a la BD
          sendVote();
          this.state.index++;

          // Quitar la selección del checkbox
          this.setState({ vote: 0 })
        }
      }

      if (this.state.index > this.state.oficios.length - 1) {
        console.log("SE HA TERMINADO LA VOTACION");
        this.setState({isFinished: true});
      }

    }

    const checkvotes = (vote) => {
      return this.state.vote == vote ? true : false;
    }

    // Pantalla de carga de espera
    if (this.state.loading || this.state.loadingVote) {
      console.log("[cargando...]");
      console.log("loading: ", this.state.loading);
      console.log("loading vote: ", this.state.loadingVote);
      // Se llama la primera vez
      getOficios();
      return (
        <Waiting />
      )
    }

    // Pantalla de finalización
    if(this.state.isFinished){
      return (
        <Finish />
      )
    }

    return (
      <View style={styles.root}>
        <View style={{ alignItems: 'center' }}>

        </View>
        <View style={styles.voteFrame}>
          <Text style={styles.txt_title}>{this.state.oficios[this.state.index]}</Text>
          <View style={styles.form}>
            <View style={{ ...styles.option, backgroundColor: '#52C85D' }}>
              <Icon name={'check'} size={20} style={{ ...styles.icon, color: palette.favor }} />
              <Text style={{ ...styles.optionText, color: palette.favor }}>A Favor</Text>
              <View style={{ ...styles.checkview, backgroundColor: palette.favor }}>
                <BouncyCheckbox
                  size={55}
                  fillColor={palette.favor}
                  unfillColor={palette.favor}
                  disableBuiltInState={true}
                  onPress={() => {
                    this.setState({ vote: 1 })
                  }}
                  isChecked={checkvotes(1)}
                />

              </View>
            </View>

            <View style={{ ...styles.option, backgroundColor: '#C85252' }}>
              <Icon name={'times'} size={20} style={{ ...styles.icon, color: palette.contra, }} />
              <Text style={{ ...styles.optionText, color: palette.contra, }}>En Contra</Text>
              <View style={{ ...styles.checkview, backgroundColor: palette.contra, }}>
                <BouncyCheckbox
                  size={55}
                  fillColor={palette.contra}
                  unfillColor={palette.contra}
                  disableBuiltInState={true}
                  onPress={() => {
                    this.setState({ vote: 2 })
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
                  fillColor={palette.darkblue}
                  unfillColor={palette.darkblue}
                  disableBuiltInState={true}
                  onPress={() => {
                    this.setState({ vote: 3 })
                  }}
                  isChecked={checkvotes(3)}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={next}>
              <Text style={{ color: palette.white, fontSize: 20, fontWeight: 'bold' }}>Votar</Text>
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
  }

});
