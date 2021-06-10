import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import apiKeys from '../../../config/keys';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const LandingScreen = ({ navigation }) => {

  useEffect(
    () => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         navigation.replace('appTabs');
       } else {
         navigation.replace('Sign Up');
       }
     });
   }
  );



  return (
    <View style={styles.container}>
    <ActivityIndicator size='large' />
  </View>
  );
};

export default LandingScreen;