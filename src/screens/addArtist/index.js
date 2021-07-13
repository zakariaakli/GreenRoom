// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform } from 'react-native';
import * as firebase from 'firebase';
import DropDownPicker from 'react-native-dropdown-picker';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const AddArtistInfos = ({ navigation }) => {

  const [artisticName, setArtisticName] = useState("");
  const [description, setDescription] = useState("");
  const [artisticAge, setArtisticAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dbArtisticName, setDbArtisticName] = useState("");
  const [dbDescription, setDbDescription] = useState("");
  const [dbArtisticAge, setDbArtisticAge] = useState("");
  const [experience, setExperience] = useState("");
  const [open, setOpen] = useState(false);
  const [ExperienceItems, setExperienceItems] = useState([
    { label: 'Débutant', value: 'Débutant' },
    { label: 'Experimenté', value: 'Experimenté' },
    { label: 'Confirmé', value: 'Confirmé' }
  ]);
  const [instruments, setInstruments] = useState("");
  const [profileType, setProfileType] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [profileItems, setProfileItems] = useState([
    { label: 'Artiste', value: 'Artiste' },
    { label: 'Restaurant/Bar', value: 'Restaurant/Bar' }
  ]);


  const storeUser = () => {
    if (artisticName === '') {
      alert('choisi ton nom artistique!')
    }
    else if (artisticName == dbArtisticName && description == dbDescription && artisticAge == dbArtisticAge) {
      console.log('rien')
      navigation.navigate('Ajouter media');
    }
    else {
      console.log('ajout')
      setIsLoading(true);
      if(profileType == "Artiste"){
        firebase.firestore().collection('userDetails').add({
          artisticName: artisticName,
          description: description,
          age: artisticAge,
          userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
          images: [],
          imagesToShow: [],
          video: "",
          videoToShow: "",
          isArtist: true,
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
      else if (profileType == "Restaurant/Bar"){
        firebase.firestore().collection('userDetails').add({
          artisticName: artisticName,
          description: description,
          userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
          images: [],
          imagesToShow: [],
          video: '',
          isArtist: false,
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

      <DropDownPickere
        placeholder="Je suis ..."
        open={openProfile}
        value={profileType}
        items={profileItems}
        setOpen={setOpenProfile}
        setValue={setProfileType}
        setItems={setProfileItems}
      />
      {
        (profileType == "Artiste") ? (
          <View>
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
              placeholder="Niveau d'expérience"
              open={open}
              value={experience}
              items={ExperienceItems}
              setOpen={setOpen}
              setValue={setExperience}
              setItems={setExperienceItems}
            />
          </View>
        ) :( profileType=="Restaurant/Bar" ? (<View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Décrivez votre établissement pour vos artistes'}
            value={description}
            onChangeText={(val) => setDescription(val)}
          />
        </View>) : null)
      }

      {
        profileType == "" ? null : (<View style={styles.button}>
          <Button
            title='Suivant'
            onPress={() => storeUser()}
            color="#19AC52"
          />
        </View>)
      }

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