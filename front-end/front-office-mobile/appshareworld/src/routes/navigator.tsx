import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AddScreen from "../screens/AddScreen";
import SearchScreen from "../screens/SearchScreen";
// import SearchListScreen from '../screens/SearchListScreen';
import ProfileScreen from "../screens/ProfileScreen";
import MyDonnationsScreen from "../screens/profile/MyDonnationsScreen";
import UpdateOfferScreen from "../screens/offers/UpdateOfferScreen";
import OfferActionsScreen from "../screens/offers/OfferActionsScreen";
import WantedByUserScreen from "../screens/offers/WantedByUserScreen";
import UserActionsScreen from "../screens/profile/UserActionsScreen";
import NsPropsType from "./propsType";
import { SignInScreen } from "../screens/authScreen/SignIn";
import SignUpScreen from "../screens/authScreen/SignUp";
import { authService } from "../services/auth.service";
import { useNavigation } from "@react-navigation/core";

export interface Props {
  isDisconnected: boolean;
}

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function messageDisconnect(props: Props) {
  const navigation = useNavigation();
  if (props.isDisconnected == false) {
    authService.login_service;
    console.log("Connecté");
  }
  if (props.isDisconnected == true) {
    authService.logout_service();
    navigation.navigate("HomeScreen");
    console.log("Déconnecté");
  }
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e9383f" },
        headerTintColor: "#fff",
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "ShareWorld" }}
      />
    </HomeStack.Navigator>
  );
}
const NotificationStack = createStackNavigator();
function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e9383f" },
        headerTintColor: "#fff",
      }}
    >
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "Mes Notifications" }}
      />
    </NotificationStack.Navigator>
  );
}

const AddStack = createStackNavigator();
function AddStackScreen() {
  return (
    <AddStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e9383f" },
        headerTintColor: "#fff",
      }}
    >
      <AddStack.Screen
        name="Create"
        component={AddScreen}
        options={{ title: "Créer une offre" }}
      />
    </AddStack.Navigator>
  );
}
const SearchStack = createStackNavigator<NsPropsType.NavigatorSearchStackParamList>();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e9383f" },
        headerTintColor: "#fff",
      }}
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <SearchStack.Screen name='SearchListScreen'
                component={SearchListScreen}
                options={{
                    headerShown: false,
                }}
            /> */}
    </SearchStack.Navigator>
  );
}
const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#e9383f" },
        headerTintColor: "#fff",
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Mon Compte" }}
      />
      <ProfileStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ title: "Connexion" }}
      />
      <ProfileStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Créer un compte" }}
      />
      <ProfileStack.Screen
        name="MyDonnationsScreen"
        component={MyDonnationsScreen}
        options={{ title: "Mes dons" }}
      />
      <ProfileStack.Screen
        name="UserActionsScreen"
        component={UserActionsScreen}
        options={{ title: "Mon Compte" }}
      />
      <ProfileStack.Screen
        name="OfferActionsScreen"
        component={OfferActionsScreen}
        options={({ route }: any) => ({ title: route.params.name })}
      />
      <ProfileStack.Screen
        name="UpdateOfferScreen"
        component={UpdateOfferScreen}
        options={({ route }: any) => ({ title: route.params.name })}
      />
      <ProfileStack.Screen
        name="WantedByUserScreen"
        component={WantedByUserScreen}
        options={{ title: "Gérer les demandes" }}
      />
    </ProfileStack.Navigator>
  );
}

const Navigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#e9383f",
          height: 60,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          color = "#fff";
          size = 40;

          switch (route.name) {
            case "HomeScreen":
              iconName = focused ? "home" : "home-outline";
              break;
            case "NotificationScreen":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            /*  case 'AddScreen':
                             iconName = focused ? 'add-circle' : 'add-circle-outline'
                             break; */
            case "SearchScreen":
              iconName = focused ? "search" : "search-outline";
              break;
            case "ProfileScreen":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => {
          return null;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationStackScreen}
      />
      <Tab.Screen
        name="AddScreen"
        component={AddStackScreen}
        options={{
          tabBarButton: (props) => (
            <View style={styles.container} pointerEvents="box-none">
              <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Ionicons
                  name={"add-circle-outline"}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen name="SearchScreen" component={SearchStackScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -25.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 74,
    height: 74,
    borderRadius: 38,
    backgroundColor: "#e9383f",
  },
  buttonIcon: {
    fontSize: 78,
    color: "#fff",
  },
});
export default Navigator;
