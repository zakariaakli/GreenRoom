import React, { useState, useEffect, } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text, TextInput, Button
} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#f0f8ff',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {


    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ff1493',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: '#696969',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: '#696969',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    TextLabel: {
        fontSize: RFPercentage(2),
        color: 'darkorchid',
        fontWeight: 'bold',
        textAlign: 'justify',
        left: 15

    },
    container: {
        flex: 1,
        padding: 35
    },
});

function chat({route, navigation}) {

const sendMessage = () => {
    navigation.navigate('GreenRoom');
}

    //const { artisticName } = route.params;

    return (

        <ScrollView
            style={styles.container}>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder={'Merci de saisir votre message ...'}

                />
            </View>
            <View style={styles.button}>
                <Button
                    title='Envoyer'
                    onPress={() => sendMessage()}
                    color="#19AC52"
                />
            </View>

        </ScrollView>
    );
}

export default chat;