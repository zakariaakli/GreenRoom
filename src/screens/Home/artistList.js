
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Button, TouchableOpacity } from 'react-native'
import RootComponent  from '../../components/homeCard';
import { useRoute } from '@react-navigation/native';
import * as firebase from 'firebase';

let styles = {
    text: {
        fontSize: 15,
        color: 'black',
        fontStyle: 'italic'
    },
    image: {
        width: 800,
        resizeMode: 'contain',
        height: 220
    },
    card: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "stretch",
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardContainer: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .5,
        shadowRadius: 12,
        elevation: 1,
    }
}

const ARList = ({navigation}) => {

    const [artistList, setArtistList] = useState([]);
    useEffect(() => {
        const getImages = async () => {
            const response = await firebase.firestore().collection('userDetails').get();
            setArtistList(await response.docs.map(doc => doc.data()));
        }
        getImages();
        return () => {
            setArtistList([]);
        };
    }, [])

        return (
            // implemented without image with header

            artistList.map(({artisticName, description, imagesToShow} , i) => {

                return (

                    <TouchableWithoutFeedback   key={i} onPress={() => navigation.navigate('Details', {
                            artisticName: artisticName, description: description, images: imagesToShow
                    })}>
                        <View >
                            <RootComponent key={i} arImages={imagesToShow}  arName={artisticName} arResume={description} arRating={5} />
                        </View>
                     </TouchableWithoutFeedback>
                );
            })
        )
}

export default ARList;