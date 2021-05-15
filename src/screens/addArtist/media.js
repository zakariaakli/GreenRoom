import React, { Component, useState, useEffect, useReducer } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform, Image } from 'react-native';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

 const currentUser = firebase.auth().currentUser ? firebase.auth().currentUser : null;

function media(){

    const [image, setImage] = useState(null);
    const [usersDetails, setUsersDetails] = useState([]);
    const [images, setImages] = useState([])

    useEffect(() => {
        const im = async() => {if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert("Pas d'autorisation pour la camera");
          }
        }}
        im();

      }, [])

      const fetchUsersDetails=async(imageUri)=>{
        const response=firebase.firestore().collection('userDetails');
        const data=await response.where('userId', '==', 'ms7JlYODkoSUIlG4sKJEFf6Jzk02').get();
        const item = await data.docs[0];
        let dbImages = await data.docs[0].data().images;
        await response.doc(item.id).update({
          images: [...dbImages, imageUri]
        }).then(()=>{
            setImages(dbImages => [...dbImages,imageUri] );
            // console.log(images);
            // const im = firebase.storage().ref('/06da9bd6-dd53-47cc-afc5-955f182e6cec.jpg');
            // setImage(im);
            //const ref = firebase.storage().ref('/Images');
            //const url = await ref.getDownloadURL();
        })
        .catch((error)=>{
          Alert.alert(error);
        })
    }

      const onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });

        if (!result.cancelled) {
          var uid = uuid.v4();
          uploadImage(result.uri, uid)
            .then(() => {
              //setImage(result.uri);
              Alert.alert("success");
              fetchUsersDetails(uid);
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


return (
<ScrollView style={styles.container}>
      <View>
        <Button title="Choisit une photo ..." onPress={onChooseImagePress} />
        {image&& <Image source={{ uri: image }} style={{
          width: 200,
          height: 200
        }}
        />}
      </View>
    </ScrollView>
)
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

  export default media;



