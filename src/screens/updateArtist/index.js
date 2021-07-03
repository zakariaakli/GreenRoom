// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform } from 'react-native';
import * as firebase from 'firebase';
import DropDownPicker from 'react-native-dropdown-picker';


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
  const [dbExperience, setDbExperience] = useState("");
  const [experience, setExperience] = useState("");
  const [open, setOpen] = useState(false);
  const [ExperienceItems, setExperienceItems] = useState([
    {label: 'Débutant', value: 'Débutant'},
    {label: 'Experimenté', value: 'Experimenté'},
    {label: 'Confirmé', value: 'Confirmé'}
  ]);
  const [instruments, setInstruments] = useState("");
  const [dbInstruments, setDbInstruments] = useState("");

  useEffect(() => {
    const getUserInfos = async()=>{
      const response=firebase.firestore().collection('userDetails');
      response.where('userId', '==', firebase.auth().currentUser.uid).get().then(doc=>{
        console.log(doc.size);
        if(doc.size>0){
          setDocId(doc.docs[0].id);
          console.log(doc.docs[0].data().artisticName)
          setArtisticName(doc.docs[0].data().artisticName);
          setDbArtisticName(doc.docs[0].data().artisticName);
          setArtisticAge(doc.docs[0].data().age);
          setDbArtisticAge(doc.docs[0].data().age);
          setDescription(doc.docs[0].data().description);
          setDbDescription(doc.docs[0].data().description);
          setExperience(doc.docs[0].data().experience);
          setDbExperience(doc.docs[0].data().experience);
          setDbInstruments(doc.docs[0].data().instruments);
          setInstruments(doc.docs[0].data().instruments);

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
    else if(artisticName == dbArtisticName && description == dbDescription && artisticAge == dbArtisticAge
       && experience == dbExperience){
      console.log('rien')
      navigation.navigate('Ajouter media');
    }
    else {
      console.log('ajout')
      setIsLoading(true);
      firebase.firestore().collection('userDetails').doc(docId).update({
        artisticName: artisticName,
        description: description,
        age : artisticAge,
        experience: experience,
        instruments: instruments
      }).then((res) => {
        setArtisticName("");
        setDescription("");
        setArtisticAge("");
        setIsLoading(false);
        setExperience("");
        setInstruments("");

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
          placeholder={'Nom'}
          value={artisticName}
          onChangeText={(val) => setArtisticName(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={'Dites nous en plus sur vos talents ...'}
          value={description}
          onChangeText={(val) => setDescription(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          numeric
          keyboardType={'numeric'}
          placeholder={'Age'}
          value={artisticAge}
          onChangeText={(val) => setArtisticAge(val)}
        />
      </View>
      <View style={styles.inputGroup}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Quels instruments maitrisez-vous (guitare, piano, chant ...)'}
                value={instruments}
                onChangeText={(val) => setInstruments(val)}
              />
            </View>
      <DropDownPicker
      open={open}
      value={experience}
      items={ExperienceItems}
      setOpen={setOpen}
      setValue={setExperience}
      setItems={setExperienceItems}
    />
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