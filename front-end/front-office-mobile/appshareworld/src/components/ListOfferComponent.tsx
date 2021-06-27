import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NsOffer from "../models/NsOffer";
import { DateHelper } from "../helpers/DateHelper";
import { StringHelper } from "../helpers/StringHelper";

const OfferListComponent: React.FC<NsOffer.IOfferData[]> = (props) => {
  const data = Object.values(props);

  const renderOffer: ListRenderItem<NsOffer.IOfferData> = ({ item }) => (
    <View key={item.id} style={styles.itemContainerStyle}>
      {item.pictures[0] && item.pictures[0].url ? (
        <Image
          style={styles.imageStyle}
          source={{ uri: item.pictures[0].url }}
        />
      ) : (
        <Image
          style={styles.imageStyle}
          source={require("../assets/logo.png")}
        />
      )}
      <Text style={styles.textLabelStyle}>
        {" "}
        {StringHelper.getSliceString(item.label, 0, 20)}{" "}
      </Text>
      <View style={styles.infoStyle}>
        <Text style={{ marginRight: 5 }}>
          <Ionicons name="location" color="red" size={15} />{" "}
          {item.exchange_address.distance} Km
        </Text>
        <Text>
          <Ionicons name="time" color="red" size={15} />{" "}
          {DateHelper.getNumberOfDays(item.created_at)}
        </Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderOffer}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: "#e9383f",
    textAlignVertical: "center",
    fontSize: 17,
    fontWeight: "900",
  },
  itemContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 190,
    padding: 5,
  },
  textLabelStyle: {
    textAlign: "center",
    marginBottom: 3,
  },
  infoStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginBottom: 3,
  },
});
export default OfferListComponent;
