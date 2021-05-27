const images = [
    'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28',
    'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F236b6f7e-bcbb-490b-ac76-12dc39f2195e?alt=media&token=58931e90-647b-417a-9ea2-8b9cc5d4786f'
]

const users = [
    {
        id:1,
        title: 'Florent pagny',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        avatar: [require('../../../images/2542330149.jpg'), require('../../../images/Angelina-Jolie-Essay-Elle-September-Issue-2019.jpg')],
        rating: 4.5
     }
    ,
    {
        id:2,
        title: 'Shakira',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        avatar: [require('../../../images/Angelina-Jolie-Essay-Elle-September-Issue-2019.jpg'), require('../../../images/metallica.jpg')],
        rating: 2.5
    },
    {
        id:3,
        title: 'Metallica',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        avatar: [require('../../../images/metallica.jpg'), require('../../../images/Angelina-Jolie-Essay-Elle-September-Issue-2019.jpg')],
        rating: 4
    }
]
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
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
            //console.log(artistList);

            // artistList.map(item => {
            //     if (item.images && item.images.length > 0) {
            //         item.images.map(uri => {

            //             // console.log(uri)
            //             firebase.storage()
            //                 .ref('images/' + uri) //name in storage in firebase console
            //                 .getDownloadURL()
            //                 .then((url) => {
            //                     setArtistList(
            //                         item.imagesToShow = [...item.imagesToShow, url]
            //                     )
            //                     //console.log(item);
            //                 })
            //                 .catch((e) => console.log('Errors while downloading => ', e));
            //         })
            //     }
            // })
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

                    <TouchableWithoutFeedback  key={i} onPress={() => navigation.navigate('Details', {
                            id: i
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