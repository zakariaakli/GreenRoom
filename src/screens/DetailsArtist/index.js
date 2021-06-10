import React, { useState, useEffect, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image, TextInput, Button

} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loggingOut } from '../../../API/firebaseMethods';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

function detailsArtist({ route, navigation }) {
  const [imageUrl, setImageUrl] = useState([]);
  const [address, setAddress] = useState('');
  const [active, setActive] = useState(0);

  const { artisticName, description, images } = route.params;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  }


  const sendMessage = () => {
    navigation.navigate('Envoyer message', { artisticName: artisticName});
  }

  return (
    <ScrollView style={styles.container}>
     <View style={{
        backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5, flex: 1, alignItems: "center", justifyContent: "center", marginBottom: '-20%',
      }}>
        <View style={{ width: 350, backgroundColor: "white" }}>
          <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} onScroll={change}>
            {
              images.map((url, i) => (
                <Image onStartShouldSetResponder={() => true} key={i} style={{ width: 350, height: 300, resizeMode: 'cover' }} source={{ uri: url }} />

              ))
            }
          </ScrollView>
          <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom: 0 }}>
            {
              images.map((k, i) => (
                <Text key={i} style={i == active ? styles.paginActiveText : styles.pagingText}>⬤</Text>

              ))
            }

          </View>
        </View>
      </View>


      <View style={styles.bodyContent}>
        <Text style={styles.name}>{artisticName} </Text>
        <Text style={styles.info}>{description}</Text>
      </View>
      <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "25%", width: "90%", marginLeft: "5%" }} />
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            {/* <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop : "10%", width : "90%", marginLeft : "5%"}} /> */}
            <Text style={styles.subtitle}>À propos de </Text>
            <Text style={styles.text}>  Disponibilité :  Immédiate</Text>
            <Text style={styles.text}>  Ville :  Paris</Text>
            <Text style={styles.text}>  Age :  19 ans</Text>
            <Text style={styles.text}>  Expérience :  confirmé</Text>

          </View>
          {/* <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "-10%", width: "90%", marginLeft: "5%" }} /> */}
          <View style={styles.bodyContent}>
            <Text style={styles.subtitle}>Instruments utilisés</Text>
            <Text style={styles.text}>Guitar, Saxo, Piano </Text>
          </View>
          {/* <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "-8%", width: "90%", marginLeft: "5%" }} /> */}
          <View style={styles.bodyContent}>
            <Text style={styles.subtitle}>Mobilité </Text>
            <Text style={styles.text}> Nante, La Rochelle, Brest  </Text>

          </View>


        </View>

      </View>
      <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "50%", width: "80%", marginLeft: "8%" }} />
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.subtitleComments}>Commentaires</Text>
            <Image style={styles.commentsAvatar} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28' }} />
            <Text style={styles.NamecommentText}> Fréderic </Text>
            <Text style={styles.commentText}> Trés bon service, merci beaucoup ! </Text>
          </View>

        </View>
        <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "10%", width: "80%", marginLeft: "8%" }} />
      </View>
      <View>
        <Button
          title="Envoyer message"
          color="green"
          onPress={sendMessage}
        />
      </View>
      <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: '-45%',
    backgroundColor: "white",
    borderRadius: 20,
    width: '90%',
    marginLeft: "5%",
    marginRight: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bodyContent: {
    //flex: 1,
    alignItems: 'center',
    padding: 10,

  },

  container: {
    flex: 1,
    marginTop: "10%"
  },
  subtitle: {
    fontSize: 20,
    color: "darkorchid",
    fontWeight: 'bold',
    textAlign: 'left'


  },
  subtitleComments: {
    fontSize: 20,
    color: "darkorchid",
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: '-20%',


  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "darkorchid",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '2%'
  },
  name: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: 'center'
  },
  bodyContent: {
    flex: 1,
    padding: '15%',
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
    marginTop: '20%',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  info: {
    fontSize: 18,
    color: "darkorchid",
    marginTop: '5%',
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: '5%',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: 'left'
  }, commentsAvatar: {
    width: 40,
    height: 18,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: "darkorchid",
    position: 'absolute',
    marginTop: '17%',
    marginLeft: "5%"

  },
  NamecommentText: {
    fontSize: 16,
    color: "black",
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: "2%"

  },
  commentText: {
    fontSize: 16,
    color: "black",
    marginLeft: '5%',

  },
  pagingText: { fontSize: 10, color: '#888', margin: 3 },
  paginActiveText: { fontSize: 10, color: '#fff', margin: 3 }

});


export default detailsArtist;