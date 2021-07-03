import React, { Component, useState, useEffect, useReducer } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, Platform, Image, Text } from 'react-native';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { Video, AVPlaybackStatus } from 'expo-av';

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

function media({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [mediaToShow, setMediaToShow] = useState([]);
  const [withVideo, setWithVideo] = useState(false);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  }

  useEffect(() => {
    const im = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Pas d'autorisation pour la camera");
        }
      }
    }
    im();

    const getMedias = async () => {
      const response = firebase.firestore().collection('userDetails');
      const data = await response.where('userId', '==', firebase.auth().currentUser.uid).get();
      let dbVideo = await data.docs[0].data().videoToShow;

      if(dbVideo != ""){
        setMediaToShow(mediaToShow => [...mediaToShow, dbVideo]);
        setWithVideo(true);
      }

      let dbImages = await data.docs[0].data().imagesToShow;
      for (var i = 0; i < dbImages.length; i++) {
        //console.log(dbImages[i])
        setMediaToShow(mediaToShow => [...mediaToShow, dbImages[i]]);
      }
    }
    getMedias();


    return () => {
      setMediaToShow([]);
    };
  }, [])

  const getMediasUpdate = async () => {
    setMediaToShow([]);
    setWithVideo(false);
    const response = firebase.firestore().collection('userDetails');
    const data = await response.where('userId', '==', firebase.auth().currentUser.uid).get();
    let dbVideo = await data.docs[0].data().videoToShow;

    if(dbVideo != ""){
      setMediaToShow(mediaToShow => [...mediaToShow, dbVideo]);
      setWithVideo(true);
    }

    let dbImages = await data.docs[0].data().imagesToShow;
    for (var i = 0; i < dbImages.length; i++) {
      //console.log(dbImages[i])
      setMediaToShow(mediaToShow => [...mediaToShow, dbImages[i]]);
    }
    setIsLoading(false);
  }

  const fetchUsersDetails = async (imageUri) => {
    const response = firebase.firestore().collection('userDetails');
    const data = await response.where('userId', '==', firebase.auth().currentUser.uid).get();
    const item = await data.docs[0];
    let dbImages = await data.docs[0].data().images;
    let dbImagesToshow = await data.docs[0].data().imagesToShow;
    await response.doc(item.id).update({
      images: [...dbImages, imageUri]
    }).then(() => {
      firebase.storage()
        .ref('images/' + imageUri) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
          response.doc(item.id).update({
            imagesToShow: [...dbImagesToshow, url]
          }).then(() => {
            getMediasUpdate();

          })
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    })
      .catch((error) => {
        setIsLoading(false);
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
          fetchUsersDetails(uid);
        })
        .catch((error) => {
          Alert.alert(error);
          setIsLoading(false);
        });
    }
  }

  const uploadImage = async (uri, imageName) => {
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  const uploadVideo = async (uri, videoName) => {
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("videos/" + videoName);
    return ref.put(blob);
  }

  const onChooseVideoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      var uid = uuid.v4();
      uploadVideo(result.uri, uid)
        .then(() => {
          fetchUsersVideoDetails(uid);
        })
        .catch((error) => {
          Alert.alert(error);
          setIsLoading(false);
        });
    }
  }

  const fetchUsersVideoDetails = async (videoUri) => {
    const response = firebase.firestore().collection('userDetails');
    const data = await response.where('userId', '==', firebase.auth().currentUser.uid).get();
    const item = await data.docs[0];
    await response.doc(item.id).update({
      video: videoUri
    }).then(() => {
      firebase.storage()
        .ref('videos/' + videoUri) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
          response.doc(item.id).update({
            videoToShow: url
          }).then(() => {
            getMediasUpdate();
          })
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(error);
      })
  }


  const finish = () => {
    navigation.navigate('GreenRoom');

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
      <View >
        <Text style={styles.text}>Ajouter vos photos, video ...</Text>
        <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View style={{ width: 350, backgroundColor: "white" }}>
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} onScroll={change}>
              {
                withVideo ?
                mediaToShow.map((url, i) => (
                 i==0 ?
                 <Video
                 key={i}
                 style={{ width: 350, height: 300, resizeMode: 'cover' }}
                 source={{
                   uri: url,
                 }}
                 useNativeControls
                 resizeMode="contain"
                 isLooping
               /> :

                  <Image onStartShouldSetResponder={() => true} key={i} style={{ width: 350, height: 300, resizeMode: 'cover' }} source={{ uri: url }} />

                ))
                : mediaToShow.map((url, i) => (
                   <Image onStartShouldSetResponder={() => true} key={i} style={{ width: 350, height: 300, resizeMode: 'cover' }} source={{ uri: url }} />
                 ))
              }
            </ScrollView>
            <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom: 0 }}>
              {
                mediaToShow.map((k, i) => (
                  <Text key={i} style={i == active ? styles.paginActiveText : styles.pagingText}>⬤</Text>

                ))
              }

            </View>

          </View>


        </View>
        <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />
        <View>
          <Button title="Choisit une photo ..." color="orange" onPress={onChooseImagePress} />
        </View>
        <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />
        <View>
          <Button title="Choisit une vidéo ..." color="blue" onPress={onChooseVideoPress} />
        </View>
        <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />




        <View>
          <Button title="Terminé" color="darkorchid" onPress={finish} />
        </View>
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
  },
  pagingText: { fontSize: 10, color: '#888', margin: 3 },
  paginActiveText: { fontSize: 10, color: '#fff', margin: 3 },
  text: {
    fontSize: 20,
    color: "darkorchid",
    fontWeight: 'bold',
    textAlign: 'left'
  }
})

export default media;



