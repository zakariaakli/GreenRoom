import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import  ARList  from './artistList';
import * as firebase from 'firebase';
import {loggingOut} from '../../../API/firebaseMethods';
import apiKeys from '../../../config/keys';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#f0f8ff',
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      

    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#ff1493',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: '#696969',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: '#696969',
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    TextLabel: {
      fontSize: RFPercentage(2),
      color: 'darkorchid',
      fontWeight: 'bold',
      textAlign: 'justify',
      left: 15

    }
});

function Home (navigation) {
  let currentUserUID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      let doc = await firebase
      .firestore()
      .collection('users')
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName)
      }
    }
    getUserInfo();
  })

    return (
        <SafeAreaView>

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>

              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>


                <Text style={styles.TextLabel}>Bjr {firstName}, Réservez le meilleur talent GreenRoom ...</Text>
                <ARList {...navigation}/>

              </View>

            </ScrollView>
          </SafeAreaView>
    );

};

export default Home;