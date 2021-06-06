import React from 'react';
import { NavigationContainer, DrawerActions, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from './screens/Landing';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import PasswordForgetScreen from './screens/PasswordForget';
import HomeScreen from './screens/Home';
import DetailsArtist from './screens/DetailsArtist';
import AddArtistInfos from './screens/addArtist';
import * as firebase from 'firebase';
import apiKeys from '../config/keys';
import media from './screens/addArtist/media'
import { loggingOut } from '../API/firebaseMethods';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from './screens/Profil';
import UpdateArtistScreen from './screens/updateArtist';

// ZAK Drawer Navigation -- a new navigation technique from React Navigation -- as nested navigation within the previously implemented Stack Navigation.
const Drawer = createDrawerNavigator();
function HomeStack() {
  return (
    <RootStack.Navigator
        navigationOptions= {{
          headerLeft: ()=> null,
          }}
      screenOptions={{
        headerStyle: { backgroundColor: '#FF5A60' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false
      }}>
      <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })
        }
        />
      <RootStack.Screen
        name="Details"
        component={DetailsArtist}
      />
    </RootStack.Navigator>
  );
}
function SettingsStack() {
  return (
    <RootStack.Navigator

      screenOptions={{
        headerStyle: { backgroundColor: '#FF5A60' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false
      }}>
      <RootStack.Screen
        name="Profil"
        component={ProfileScreen}
      />

    </RootStack.Navigator>
  );
}

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen
        name="Password Forget"
        component={PasswordForgetScreen}
      />
    </Drawer.Navigator>
  );
};

// ZAK The Tab Navigation is used to highlight the main features of an app at the bottom of the phone screen
const Tab = createBottomTabNavigator();

const appTabs = () => {
  return (
    <Tab.Navigator

        tabBarOptions={{
          activeTintColor: '#FF5A60',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
  );
};
// ZAK Drawer Navigation -- a new navigation technique from React Navigation -- as nested navigation within the previously implemented Stack Navigation.
const RootStack = createStackNavigator();

const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleSignIn = () => {
    // TODO implement real sign in mechanism

    setIsAuthenticated(true);
  };
  const handleSignOut = () => {

      loggingOut();
  };
  const handleSignUp = () => {
    // TODO implement real sign up mechanism

    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{
        headerStyle: { backgroundColor: 'purple' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
      >

        <RootStack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}

        />
 <RootStack.Screen
          name="appTabs"
          component={appTabs}

        />

        <RootStack.Screen name="Sign In">
          {(props) => (
            <SignInScreen {...props} onSignIn={handleSignIn} />
          )}

        </RootStack.Screen>
        <RootStack.Screen name="Sign Up">
          {(props) => (
            <SignUpScreen {...props} onSignUp={handleSignUp} />
          )}
        </RootStack.Screen>
        <RootStack.Screen
          name="Password Forget"
          component={PasswordForgetScreen}
        />
      <RootStack.Screen
          name="Ajouter Info"
          component={AddArtistInfos}
        />

        <RootStack.Screen
          name="Modifer Info"
          component={UpdateArtistScreen}
        />
      <RootStack.Screen
          name="Ajouter media"
          component={media}
        />


      </RootStack.Navigator>

    </NavigationContainer>
  );
};

export default App;