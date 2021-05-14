import { CurrentRenderContext } from "@react-navigation/core";
import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";
import apiKeys from '../config/keys';

export async function registration(email, password, lastName, firstName) {
  try {
    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser ? firebase.auth().currentUser : null;
    if(currentUser){
      const db = firebase.firestore();
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
          lastName: lastName,
          firstName: firstName,
        });
    }

  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}