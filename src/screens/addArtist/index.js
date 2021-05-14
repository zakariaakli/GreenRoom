// screens/AddUserScreen.js
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform, Image } from 'react-native';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const currentUser = firebase.auth().currentUser ? firebase.auth().currentUser : null;

function AddArtistInfos() {

  this.dbRef = firebase.firestore().collection('userDetails');

  const [artisticName, setArtisticName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Pas d'autorisation pour la camera");
      }
    }
  }, [])

const storeUser = () => {
    if (artisticName === '') {
      alert('choisi ton nom artistique!')
    } else {
      setIsLoading(true);
      this.dbRef.add({
        artisticName: artisticName,
        description: description,
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
      }).then((res) => {
        setArtisticName("");
        setDescription("");
        setIsLoading(false);

        this.props.navigation.navigate('Details', {
          id: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
        })
      })
        .catch((err) => {
          console.error("Error found: ", err);
          setIsLoading(false);
        });
    }
  }

  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      uploadImage(result.uri, "test-img")
        .then(() => {
          setImage(result.uri);
          Alert.alert("success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
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
      <View>
        <Button title="Choisit une photo ..." onPress={onChooseImagePress} />
        {image && <Image source={{ uri: image }} style={{
          width: 200,
          height: 200
        }}
        />}
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