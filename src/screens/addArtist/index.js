// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform } from 'react-native';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const AddArtistInfos = ({navigation}) => {
  this.dbRef = firebase.firestore().collection('userDetails');

  const [artisticName, setArtisticName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dbArtisticName, setDbArtisticName] = useState("");
  const [dbDescription, setDbDescription] = useState("");

  useEffect(() => {
    const getUserInfos = async()=>{
      const response=firebase.firestore().collection('userDetails');
      response.where('userId', '==', firebase.auth().currentUser.uid).get().then(doc=>{
        console.log(doc.size);
        if(doc.size>0){
          console.log(doc.docs[0].data().artisticName)
          setArtisticName(doc.docs[0].data().artisticName);
          setDescription(doc.docs[0].data().description);
          setDbArtisticName(doc.docs[0].data().artisticName);
          setDbDescription(doc.docs[0].data().description);
        }
        else{
          console.log('no user');
        }
      })


  }
  getUserInfos();

  }, [])

const storeUser = () => {
    if (artisticName === '') {
      alert('choisi ton nom artistique!')
    }
    else if(artisticName == dbArtisticName && description == dbDescription){
      console.log('rien')
      navigation.navigate('Ajouter media');
    }
    else {
      console.log('ajout')
      setIsLoading(true);
      this.dbRef.add({
        artisticName: artisticName,
        description: description,
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
        images:[],
        imagesToShow:[],
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
          title='Suivant'
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