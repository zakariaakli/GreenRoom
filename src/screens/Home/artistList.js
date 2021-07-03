
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Button, TouchableOpacity, ScrollView } from 'react-native'
import RootComponent from '../../components/homeCard';
import { useRoute } from '@react-navigation/native';
import * as firebase from 'firebase';
import { Video, AVPlaybackStatus } from 'expo-av';

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
    },
    pagingText: { fontSize: 10, color: '#888', margin: 3 },
    paginActiveText: { fontSize: 10, color: '#fff', margin: 3 }
}

const ARList = ({ navigation }) => {

    const [artistList, setArtistList] = useState([]);
    useEffect(() => {
        const getImages = async () => {
            const response = await firebase.firestore().collection('userDetails').get();

            let list = await response.docs.map(doc => doc.data());

            for(var i =0; i < list.length; i++){
                if(list[i].video != ""){
                    list[i].imagesToShow.splice(0,0,'uri');
                }

            }


            setArtistList(list);



        }
        getImages();
        return () => {
            setArtistList([]);
        };
    }, [])

    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        // implemented without image with header

        artistList.map(({ artisticName, description, imagesToShow, isArtist, age, city, experience,
            instruments, mobility, isForTest, video, videoToShow }, i) => {
            if (isArtist && !isForTest) {
                return (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
                        <View style={{
                            backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}>
                            <View style={{ width: 350, backgroundColor: "white" }}>
                                <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} onScroll={change}>
                                    {
                                        video != "" ?

                                        imagesToShow.map((url, j) => (

                                        j==0 ?
                                        <Video
                                        key={j}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        style={{ width: 350, height: 350 }}
                                        source={{
                                          uri: videoToShow,
                                        }}
                                        useNativeControls
                                        resizeMode="cover"
                                        isLooping
                                      />
                                      :

                                         <Image onStartShouldSetResponder={() => true} key={j} style={{ width: 350, height: 350, resizeMode: 'cover' }} source={{ uri: url }} />

                                       ))


                                            : imagesToShow.map((url, j) => (
                                                <Image onStartShouldSetResponder={() => true} key={j} style={{ width: 350, height: 350, resizeMode: 'cover' }} source={{ uri: url }} />
                                            ))
                                    }
                                </ScrollView>
                                <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom: 0 }}>
                                    {
                                        imagesToShow.map((k, j) => (
                                            <Text key={j} style={j == active ? styles.paginActiveText : styles.pagingText}>⬤</Text>

                                        ))
                                    }

                                </View>

                                <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('Details', {
                                    artisticName: artisticName, description: description, images: imagesToShow,
                                    age: age, city: city, experience: experience, instruments: instruments,
                                    mobility: mobility, video: video, videoToShow: videoToShow
                                })}>
                                    <View >
                                        <RootComponent key={i} arImages={imagesToShow} arName={artisticName} arResume={description} arRating={5} />
                                    </View>

                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>


                );
            }

        })
    )
}

export default ARList;