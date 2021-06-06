import React from 'react';
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

class ProfileScreen extends React.Component {

    render() {
      var navigation = this.props.navigation;

      const handlePress = () => {
        loggingOut();
        navigation.reset({
          index: 4,
          routes: [{ name: 'Sign Up' }],
        });
        navigation.navigate('Sign Up');
      };

      return (
        <View style={styles.container}>
              <View style={styles.header}></View>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

              <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={styles.name}>{this.props.route.params.artisticName} </Text>
                  <Text style={styles.info}>Guitarist</Text>
                  <Text style={styles.description}> {this.props.route.params.description} </Text>
                  <Text style={styles.description}> Paris, France </Text>


                </View>

            </View>
          </View>

      );
    }
  }
  const styles = StyleSheet.create({
    header:{
      backgroundColor: "purple",
      height:150,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 63,
      borderWidth: 4,
      borderColor:  "purple",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:20
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight: 'bold'

    },
    body:{
      marginTop:40,

    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600",
      marginTop : -50,
      fontWeight: 'bold'
    },
    info:{
      fontSize:18,
      color: "purple",
      marginTop:10,
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center',
    }

  });


export default ProfileScreen;