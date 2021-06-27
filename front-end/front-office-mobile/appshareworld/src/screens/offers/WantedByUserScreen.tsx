import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constant/colors";
import NsUser from "../../models/NsUser";
import config from "./../../config.json";
import { Ionicons } from "@expo/vector-icons";

const WantedByUserScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const [listUsers, setListUsers] = useState<NsUser.IUserWantedOfferData[]>([]);
  const { offerId } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const { users } = route.params;
      setListUsers(users);
    });
    return unsubscribe;
  }, [navigation]);

  const updateDemand = (
    user: NsUser.IUserWantedOfferData,
    _newValue: boolean
  ) => {
    const newListUsers: NsUser.IUserWantedOfferData[] = [];
    for (const oldUser of listUsers) {
      if (oldUser.id === user.id) {
        oldUser.validate_by_owner = _newValue;
      }
      if (_newValue) {
        if (oldUser.id !== user.id) {
          oldUser.validate_by_owner = false;
        }
      }
      newListUsers.push(oldUser);
    }
    setListUsers(newListUsers);
    const url: string =
      `http://${config.ip}:${config.port}/userWantOffers/updateOwnerAcceptDemand/` +
      offerId +
      "/" +
      user.id;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newValue: _newValue,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const itemUser: ListRenderItem<NsUser.IUserWantedOfferData> = ({ item }) => (
    <View
      style={{
        padding: 10,
        // backgroundColor: COLORS.white2,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: COLORS.red1,
        borderRadius: 5,
        // height: 140,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text style={{ fontWeight: "bold", color: COLORS.red1 }}>
            {(item.first_name + " " + item.last_name).toUpperCase()}
          </Text>
          <Text style={{ fontStyle: "italic" }}>{item.note}</Text>
          {item.validate_by_owner && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>{item.phone}</Text>
              <Text>{item.mail}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: COLORS.red1, fontStyle: "italic" }}>
          {item.validate_by_owner
            ? "Acceptée"
            : "Non acceptée"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {item.validate_by_owner ? (
          <Ionicons
            name={"close"}
            size={25}
            color={COLORS.red1}
            onPress={() => updateDemand(item, false)}
          />
        ) : (
          <Ionicons
            name={"add"}
            size={25}
            color={COLORS.red1}
            onPress={() => updateDemand(item, true)}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, marginBottom: 20 }}>
      {listUsers && listUsers.length > 0 ? (
        <FlatList
          data={listUsers}
          renderItem={itemUser}
          keyExtractor={(itemOffer, index) => index.toString()}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#e9383f" />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  contentItem: {},
});

export default WantedByUserScreen;
