import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../constant/colors";
import UserActionsScreen from "./profile/UserActionsScreen";
import { useSelector } from "react-redux";
import { SignInScreen } from "./authScreen/SignIn";

const ProfileScreen: React.FC = () => {
  const [render, setRender] = useState<JSX.Element>(<View></View>);
  const navigation = useNavigation();
  const my_user: IUser = useSelector((state: UserState) => state.user);

  useEffect(() => {
    console.log("1");
    generateView();
  }, []);

  useEffect(() => {
    console.log("2");
    generateView();
  }, [my_user]);

  useEffect(() => {
    console.log("3");
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  console.log("USER" + my_user.accessToken);

  const generateView = () => {
    const result: JSX.Element = (
      <View>
        {/* {my_user.accessToken ? <UserActionsScreen /> : <SignInScreen />} */}
        <UserActionsScreen />
      </View>
    );
    setRender(result);
  };

  return <ScrollView>{render}</ScrollView>;
};

const style = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default ProfileScreen;
