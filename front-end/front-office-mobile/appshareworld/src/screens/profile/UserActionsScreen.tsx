import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../constant/colors";
import { useSelector } from "react-redux";

const UserActionsScreen: React.FC = () => {
  const my_user: IUser = useSelector((state: UserState) => state.user);
  const [userId] = useState(my_user.id);
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        padding: 10,
        marginBottom: 40,
      }}
    >
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("", {
            userId: userId,
          });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>MON PROFIL</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("MyDonnationsScreen", {
            userId: userId,
          });
          // navigation.navigate("MyDonnationsScreen", {
          //   userId: my_user.id,
          // });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>MES DONS</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          // navigation.navigate("", {
          //   userId: parseInt(userId, 10),
          // });
          navigation.navigate("", {
            userId: userId,
          });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>MES DEMANDES</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("", {
            userId: userId,
          });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>MES FAVORIS</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("", {
            userId: userId,
          });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>PARAMETRES</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("", {
            userId: userId,
          });
        }}
        style={style.button}
      >
        <Text style={{ color: "white" }}>DECONNEXION</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: COLORS.red1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    margin: 10,
  },
});

export default UserActionsScreen;
