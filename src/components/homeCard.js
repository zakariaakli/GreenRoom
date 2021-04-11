import React from 'react';
import { Text, View, Image } from "react-native";
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';

export class RootComponent extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
                <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ width: 350 }}>
                        <SliderBox
                            images={this.props.arImage}
                            resizeMode="cover"
                            style={{
                                height: 300,
                                width: 350
                            }}
                        />
                    </View>
                    <View style={{ width: 350, backgroundColor: "white" }}>
                        <Text style={{ color: "black", paddingTop: 3, fontSize: 20, fontWeight: 'bold' }}>
                            {this.props.arName}
                        </Text>
                    </View>
                    <View style={{ padding: 3, width: 350, backgroundColor: "white" }}>
                        <Text style={{ color: "#777" }}>
                            {this.props.arResume}
                        </Text>
                    </View>

                    <Rating
                        style={{ backgroundColor: 'white', alignItems: 'flex-start' }}
                        type='custom'
                        ratingColor='green'
                        ratingCount={5}
                        startingValue={this.props.arRating}// On peut metre X/Y egalement
                        ratingBackgroundColor='#c8c7c8'
                        imageSize={18}
                    />
                </View>
            </View>
        );
    }
}