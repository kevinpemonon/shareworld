import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import UserActionsScreen from "./profile/UserActionsScreen";
import { useSelector } from "react-redux";

const ProfileScreen: React.FC = () => {
  const [render, setRender] = useState<JSX.Element>(<View></View>);
  const navigation = useNavigation();
  const my_user: IUser = useSelector((state: UserState) => state.user);

  useEffect(() => {
    generateView();
  }, []);

  useEffect(() => {
    generateView();
  }, [my_user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

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

export default ProfileScreen;
