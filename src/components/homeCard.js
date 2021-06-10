import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Dimensions, StyleSheet } from "react-native";
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';

// const { width } = Dimensions.get("window") - 30;
// const height = width * 100 / 70;

const images = [
    'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F4037145b-ed9e-433f-93b5-0e67e2931d3a?alt=media&token=e214ade2-d51d-4f90-821a-cd72f04bfb28',
    'https://firebasestorage.googleapis.com/v0/b/greenroom-add9d.appspot.com/o/images%2F236b6f7e-bcbb-490b-ac76-12dc39f2195e?alt=media&token=58931e90-647b-417a-9ea2-8b9cc5d4786f'
]
function RootComponent(props) {

    const [active, setActive] = useState(0);

    const change = ({nativeEvent}) =>{
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== active){
            setActive(slide);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" , shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,}}>
                <View style={{ width: 350, backgroundColor: "white" }}>
                    <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} onScroll={change}>
                        {
                            props.arImages.map((url, i) => (
                                <Image onStartShouldSetResponder={() => true} key={i} style={{ width: 350, height: 300, resizeMode: 'cover' }} source={{ uri: url }} />

                            ))
                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom:0 }}>
                    {
                            props.arImages.map((k, i) => (
                                <Text key={i} style= {i==active ? styles.paginActiveText : styles.pagingText }>⬤</Text>

                            ))
                        }

                    </View>
                </View>


                <View style={{ width: 350, backgroundColor: "white" }}>
                    <Text style={{ color: "black", paddingTop: 3, fontSize: 20, fontWeight: 'bold' }}>
                        {props.arName}
                    </Text>
                </View>
                <View style={{ padding: 3, width: 350, backgroundColor: "white" }}>
                    <Text style={{ color: "#777" }}>
                        {props.arResume}
                    </Text>
                </View>

                <Rating
                    style={{ backgroundColor: 'white', alignItems: 'flex-start' }}
                    type='custom'
                    ratingColor='purple'
                    ratingCount={5}
                    startingValue={props.arRating}// On peut metre X/Y egalement
                    ratingBackgroundColor='#c8c7c8'
                    imageSize={18}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    pagingText: {fontSize: 10, color:'#888', margin:3},
    paginActiveText: {fontSize: 10, color:'#fff', margin:3}


  })

export default RootComponent;