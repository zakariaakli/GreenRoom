import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signIn } from '../../../API/firebaseMethods';
import apiKeys from '../../../config/keys';
import * as firebase from 'firebase';

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const SignInScreen = ({ onSignIn, navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    signIn(email, password);

    firebase.auth().onAuthStateChanged(user => {
      if (user ) {
        firebase.firestore().collection('userDetails').where('userId', '==', firebase.auth()
        .currentUser.uid).get().then(doc => {
          if (doc.size > 0) {
            navigation.navigate('GreenRoom');
          }
          else {
            navigation.navigate('Ajouter Info');
          }
        }).catch((error) =>{ console.log(error) })

      }

    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in to your account:</Text>

      <TextInput
        style={styles.formInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.formInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sumbit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "2%",
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a4eddf',
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: '#2E6194',
  }
});

export default SignInScreen;