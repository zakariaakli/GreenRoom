import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,

} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class ProfileScreen extends React.Component {

    render() {
      console.log(this.props);
      return (
        <View style={styles.container}>
        <ScrollView>
          <View >
            <Text style={styles.sectionHeadingStyle}>

            </Text>

            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate("FirstPage")}><Icon name = 'ios-person' size={15}>   </Icon>
               {this.props.route.params.id}
              </Text>
              <Text style={styles.navItemStyle}><Icon name = 'ios-calendar' size={15}>   </Icon>
              Réservations
              </Text>
              <Text style={styles.navItemStyle}><Icon name = 'ios-text' size={15}>   </Icon>
              Messages
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>

            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}><Icon name = 'ios-microphone' size={15}>   </Icon>
                Passer en mode artiste
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>

            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}><Icon name = 'ios-help-buoy' size={15}>   </Icon>
              Aide
              </Text>
              <Text style={styles.navItemStyle}><Icon name = 'ios-log-out' size={15}>   </Icon>
              Se déconnecter
              </Text>
            </View>
          </View>
        </ScrollView>
        </View>

      );
    }
  }
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#f0f8ff',
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: '#00ffff'

    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color:  '#ff1493',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: '#ff1493',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color:  '#ff1493',
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    TextLabel: {
      fontSize: 35,
      color: 'darkorchid',
      fontWeight: 'bold',
      textAlign: 'justify',
      left: 15

    },
    navItemStyle: {
        padding: 10
      },
      navSectionStyle: {
        backgroundColor: 'lightgrey'
      },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
      },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
      }

  });


export default ProfileScreen;