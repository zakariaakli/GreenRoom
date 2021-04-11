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
import ProfileScreen from './screens/Profile';
import DetailsArtist from './screens/DetailsArtist';

// ZAK Drawer Navigation -- a new navigation technique from React Navigation -- as nested navigation within the previously implemented Stack Navigation.
const Drawer = createDrawerNavigator();

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

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details Artist" component={DetailsArtist} />
    </Tab.Navigator>
  );
};
// ZAK Drawer Navigation -- a new navigation technique from React Navigation -- as nested navigation within the previously implemented Stack Navigation.
const RootStack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleSignIn = () => {
    // TODO implement real sign in mechanism

    setIsAuthenticated(true);
  };
  const handleSignOut = () => {
    // TODO implement real sign out mechanism

    setIsAuthenticated(false);
  };
  const handleSignUp = () => {
    // TODO implement real sign up mechanism

    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      {/*  initialRouteName="Home" */}
      <RootStack.Navigator >
        {isAuthenticated ? (
          <RootStack.Screen
          name="Home"
          component={HomeDrawer}
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerLeft: () => (
              <Button
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                title="Menu"
              />
            ),
            headerRight: () => (
              <Button onPress={handleSignOut} title="Sign Out" />
            ),
          })}
        />
        ) : (
            <>
              <RootStack.Screen
                name="Landing"
                component={LandingScreen}
                options={{
                  animationTypeForReplace: 'pop',
                }}
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
              name="Details Artist"
              component={DetailsArtist}
            />
            </>
          )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;