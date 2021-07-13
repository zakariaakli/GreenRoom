import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Image, TextInput, Button

} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loggingOut } from '../../../API/firebaseMethods';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
}


function profil({ navigation }) {
    const [imageUrl, setImageUrl] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [experience, setExperience] = useState('');
    const [instruments, setInstruments] = useState('');
    const [mobility, setMobility] = useState('');
    const [isArtist, setIsArtist] = useState(false);

    useEffect(() => {
        const getProfil = async () => {
            const response = firebase.firestore().collection('userDetails');
            const data = await response.where('userId', '==', firebase.auth().currentUser.uid).get();
            let dbImages = await data.docs[0].data().images;
            for (var i = 0; i < dbImages.length; i++) {
                //console.log(dbImages[i])
                str(dbImages[i]);
            }
            setName(data.docs[0].data().artisticName);
            setDescription(data.docs[0].data().description);
            setAddress('Lille, France');
            setAge(data.docs[0].data().age);
            setCity(data.docs[0].data().city);
            setExperience(data.docs[0].data().experience);
            setInstruments(data.docs[0].data().instruments);
            setMobility(data.docs[0].data().mobility);
            setIsArtist(data.docs[0].data().isArtist);
        }
        getProfil();

        const str = async (urli) => {
            firebase.storage()
                .ref('images/' + urli) //name in storage in firebase console
                .getDownloadURL()
                .then((url) => {
                    setImageUrl(imageUrl => [...imageUrl, url]);
                })
                .catch((e) => console.log('Errors while downloading => ', e));
        }

        return () => {
            setImageUrl([]);
            setName('');
            setDescription('');
            setAddress('');
            setAge('');
            setCity('');
            setExperience('');
            setInstruments('');
            setMobility('');
        };

    }, [])

    const handlePress = () => {
        loggingOut();
        navigation.reset({
            index: 4,
            routes: [{ name: 'Sign Up' }],
        });
        navigation.navigate('Sign Up');
    }

    const modifyProfil = () => {
        navigation.navigate('Modifer Info');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28' }} />

            <View style={styles.bodyContent}>
                <Text style={styles.name}>{name} </Text>
                <Text style={styles.info}>{description}</Text>
            </View>

            { isArtist ? (  <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "25%", width: "90%", marginLeft: "5%" }} /> ) : null}


            {isArtist ? (
                <View style={styles.container}>
                <View style={styles.profil}>
            <Text ><MaterialCommunityIcons name="map-marker-radius" color='darkorchid' size={20} /> Lille</Text>
            <Text ><MaterialCommunityIcons name="cake" color='darkorchid' size={20} /> {age}</Text>
            <Text ><MaterialCommunityIcons name="arm-flex" color='darkorchid' size={20} /> {experience}</Text>

      </View>
      <View style={styles.profil} >
       
      <Text style={styles.text}><MaterialCommunityIcons name="music-clef-treble" color='darkorchid' size={20} /> {instruments} </Text>

      </View>
                </View>
            ) : null}
            {
              isArtist ? (<View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "50%", width: "80%", marginLeft: "8%" }} /> )
    : null
            }

{isArtist ? (

            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.subtitleComments}>Commentaires</Text>
                        <Image style={styles.commentsAvatar} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28' }} />
                        <Text style={styles.NamecommentText}> Fréderic </Text>
                        <Text style={styles.commentText}> Trés bon service, merci beaucoup ! </Text>
                    </View>

                </View>
                <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "10%", width: "80%", marginLeft: "8%" }} />
            </View>
) : null}


{ isArtist ? ( <View>
                <Button
                    title="Modifier profil"
                    color="orange"
                    onPress={modifyProfil}
                />
            </View> ) : null }

            <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />
            <View>
                <Button
                    title="Se deconnecter"
                    color="darkorchid"
                    onPress={handlePress}
                />
            </View>
            <View style={{ borderBottomColor: "#DCE3EC", borderBottomWidth: 1, marginTop: "5%", width: "80%", marginLeft: "8%" }} />
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: '-45%',
        backgroundColor: "white",
        borderRadius: 20,
        width: '90%',
        marginLeft: "5%",
        marginRight: "5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bodyContent: {
        //flex: 1,
        alignItems: 'center',
        padding: 10,

    },

    container: {
        flex: 1,
        marginTop: "10%"
    },
    subtitle: {
        fontSize: 20,
        color: "darkorchid",
        fontWeight: 'bold',
        textAlign: 'left'


    },
    subtitleComments: {
        fontSize: 20,
        color: "darkorchid",
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: '-20%',


    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "darkorchid",
        alignSelf: 'center',
        position: 'absolute',
        marginTop: '2%'
    },
    name: {
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: 'center'
    },
    bodyContent: {
        flex: 1,
        padding: '15%',
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        marginTop: '20%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    info: {
        fontSize: 18,
        color: "darkorchid",
        marginTop: '5%',
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: '5%',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: "black",
        textAlign: 'left'
    }, commentsAvatar: {
        width: 40,
        height: 18,
        borderRadius: 62,
        borderWidth: 1,
        borderColor: "darkorchid",
        position: 'absolute',
        marginTop: '17%',
        marginLeft: "5%"

    },
    NamecommentText: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
        marginLeft: '5%',
        marginTop: "2%"

    },
    commentText: {
        fontSize: 16,
        color: "black",
        marginLeft: '5%',

    }

});


export default profil;