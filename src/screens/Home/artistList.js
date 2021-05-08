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
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { RootComponent } from '../../components/homeCard.js';
import { useRoute } from '@react-navigation/native';

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

export class ARList extends React.Component {
    render() {
        const { navigation } = this.props;
        console.log(this.props);
        return (
            // implemented without image with header

            users.map((u, i) => {

                return (

                    <TouchableWithoutFeedback  key={i} onPress={() => navigation.navigate('Details', {
                            id: u.id
                    })}>
                        <View >
                            <RootComponent arImage={u.avatar} arName={u.title} arResume={u.name} arRating={u.rating} />
                        </View>
                    </TouchableWithoutFeedback>
                );
            })
        )
}}

export default ARList;