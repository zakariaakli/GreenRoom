import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Keyboard, ScrollView, SafeAreaView, TextInput } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../../../API/firebaseMethods';
import apiKeys from '../../../config/keys';
import * as firebase from 'firebase';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';
import { Checkbox } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a4eddf',
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#2E6194',
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
  },
  checkbox: {
    width: 20,
    height: 20,
  },

});

// if (!firebase.apps.length) {
//   console.log('Connected with Firebase')
//   firebase.initializeApp(apiKeys.firebaseConfig);
// }

const SignUpScreen = ({ onSignUp, navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = React.useState(false);


  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user);
      }
    })

  }, [])

  const loginWithFacebook = async () => {
    const permissions = ["public_profile", "email"];
    await Facebook.initializeAsync({ "appId": "338259284397019" });


    const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions });

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error) => { console.log(error); })
    }

  }

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      ).then(function () {
        // if (!checked)
        //   navigation.navigate('appTabs');
        // else
          navigation.navigate('Ajouter Info');
        emptyState();
      });

    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account </Text>

        <TextInput
          style={styles.textInput}
          placeholder="First name*"
          value={firstName}
          onChangeText={(name) => setFirstName(name)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          value={lastName}
          onChangeText={(name) => setLastName(name)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Retype your password to confirm*"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Jeune artiste ?</Text>
          <Checkbox style={styles.checkbox}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.inlineText}>Already have an account?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={loginWithFacebook}>
            <Text style={styles.buttonText}>Login With Facebook</Text>
          </TouchableOpacity> */}

      </View>
    </SafeAreaView>


  );
};

export default SignUpScreen;