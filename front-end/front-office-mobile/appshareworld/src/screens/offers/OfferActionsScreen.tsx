import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "../../constant/colors";
import { initOffer } from "../../functions/initObject";
import NsOffer from "../../models/NsOffer";
import config from "./../../config.json";

const OfferActionsScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const [offer, setOffer] = useState<NsOffer.IOfferData>(initOffer());

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const { currentOffer } = route.params;
      navigation.setOptions({ title: currentOffer.label });
      setOffer(currentOffer);
    });
    return unsubscribe;
  }, [navigation]);

  const goToUpdateScreen = () => {
    navigation.navigate("UpdateOfferScreen", {
      oldOffer: offer,
    });
  };

  const goToWantedByUser = () => {
    navigation.navigate("WantedByUserScreen", {
      users: offer.wanted_by_users,
      offerId: offer.id,
    });
  };

  const deleteOffer = () => {
    console.log(offer);
    const url = `http://${config.ip}:${config.port}/offers/${offer.id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.log(err));

    navigation.navigate("UserActionsScreen", {
      currentOffer: offer,
    });
  };

  return (
    <View
      style={{
        padding: 16,
        flex: 1,
        justifyContent: "center",
        marginVertical: 50,
      }}
    >
      <TouchableHighlight onPress={goToUpdateScreen} style={style.button}>
        <Text style={{ color: "white" }}>MODIFIER L'OFFRE</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={goToWantedByUser} style={style.button}>
        <Text style={{ color: "white" }}>GERER LES DEMANDES</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={deleteOffer} style={style.button}>
        <Text style={{ color: "white" }}>SUPPRIMER</Text>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: COLORS.red1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    margin: 20,
  },
});

export default OfferActionsScreen;
