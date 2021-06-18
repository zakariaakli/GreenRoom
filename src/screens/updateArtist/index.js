// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform } from 'react-native';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const updateAritsInfos = ({navigation}) => {

  this.dbRef = firebase.firestore().collection('userDetails');

  const [artisticName, setArtisticName] = useState("");
  const [description, setDescription] = useState("");
  const [artisticAge, setArtisticAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dbArtisticName, setDbArtisticName] = useState("");
  const [dbDescription, setDbDescription] = useState("");
  const [dbArtisticAge, setDbArtisticAge] = useState("");
  const [docId, setDocId] = useState("");

  useEffect(() => {
    const getUserInfos = async()=>{
      const response=firebase.firestore().collection('userDetails');
      response.where('userId', '==', firebase.auth().currentUser.uid).get().then(doc=>{
        console.log(doc.size);
        if(doc.size>0){
          setDocId(doc.docs[0].id);
          console.log(doc.docs[0].data().artisticName)
          setArtisticName(doc.docs[0].data().artisticName);
          setArtisticAge(doc.docs[0].data().artisticAge);
          setDescription(doc.docs[0].data().description);
          setDbArtisticName(doc.docs[0].data().artisticName);
          setDbDescription(doc.docs[0].data().description);
          setDbArtisticAge(doc.docs[0].data().artisticAge);
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
    else if(artisticName == dbArtisticName && description == dbDescription && artisticAge == dbArtisticAge){
      console.log('rien')
      navigation.navigate('Ajouter media');
    }
    else {
      console.log('ajout')
      setIsLoading(true);
      firebase.firestore().collection('userDetails').doc(docId).update({
        artisticName: artisticName,
        description: description,
        artisticAge : artisticAge
      }).then((res) => {
        setArtisticName("");
        setDescription("");
        setArtisticAge("");
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
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={'Age'}
          value={artisticAge}
          onChangeText={(val) => setArtisticAge(val)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='Suivant'
          onPress={() => storeUser()}
          color="darkorchid"
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

export default updateAritsInfos;