// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform } from 'react-native';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const currentUser = firebase.auth().currentUser ? firebase.auth().currentUser : null;

const AddArtistInfos = ({navigation}) => {
  this.dbRef = firebase.firestore().collection('userDetails');

  const [artisticName, setArtisticName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const storeUser = () => {
    if (artisticName === '') {
      alert('choisi ton nom artistique!')
    } else {
      setIsLoading(true);
      this.dbRef.add({
        artisticName: artisticName,
        description: description,
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
        images:[],
        video:''
      }).then((res) => {
        setArtisticName("");
        setDescription("");
        setIsLoading(false);

        navigation.navigate('Ajouter media')
      })
        .catch((err) => {
          console.error("Error found: ", err);
          setIsLoading(false);
        });
    }
  }

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={'Name'}
          value={artisticName}
          onChangeText={(val) => setArtisticName(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={'Description'}
          value={description}
          onChangeText={(val) => setDescription(val)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='Add User'
          onPress={() => storeUser()}
          color="#19AC52"
        />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddArtistInfos;