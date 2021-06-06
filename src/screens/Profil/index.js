import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Image

} from 'react-native';

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

    const modifyProfil = () =>{
        navigation.navigate('Modifer Info');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28' }} />

            <View style={styles.bodyContent}>
                <Text style={styles.name}>{name} </Text>
                <Text style={styles.info}>{description}</Text>
                <Text style={styles.description}> {address} </Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text>Se deconnecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={modifyProfil}>
                    <Text>Modifier Profil</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "purple",
        alignSelf: 'center',
        position: 'absolute',
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: '15%',
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        marginTop: '20%',
        fontWeight: 'bold'
    },
    info: {
        fontSize: 18,
        color: "purple",
        marginTop: '5%',
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: '5%',
        textAlign: 'center',
    }

});


export default profil;