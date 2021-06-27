import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constant/colors";
import { DateHelper } from "../../helpers/DateHelper";
import NsOffer from "../../models/NsOffer";
import config from "./../../config.json";
import { useSelector } from "react-redux";

const MyDonnationsScreen: React.FC = ({ route }: any) => {
  const [listOffers, setListOffers] = useState<NsOffer.IOfferData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const my_user: IUser = useSelector((state: UserState) => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListOffers();
    });
    return unsubscribe;
  }, [navigation]);

  const getListOffers = async () => {
    const { userId } = route.params;
    const url = `http://${config.ip}:${config.port}/offers/createdBy/${1}`;
    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const offers: NsOffer.IOfferData[] = result.offers;
        setListOffers(offers);
        setLoading(false);
      });
  };

  const goToDetail = (offer: NsOffer.IOfferData) => {
    navigation.navigate("OfferActionsScreen", {
      currentOffer: offer,
    });
  };

  const itemOffer: ListRenderItem<NsOffer.IOfferData> = ({ item }) => (
    <TouchableOpacity style={style.item} onPress={() => goToDetail(item)}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={style.contentImage}>
          {item.pictures.length > 0 ? (
            <Image
              style={style.image}
              source={{
                uri: `http://${config.ip}:${config.port}/pictures/${item.pictures[0].url}`,
              }}
            />
          ) : (
            <Image
              style={style.image}
              source={require("../../assets/logo.png")}
            />
          )}
        </View>
        <View style={style.contentText}>
          <Text
            style={{ fontSize: 12, color: COLORS.red2, fontWeight: "bold" }}
          >
            {item.label.toUpperCase()}
          </Text>
          <Text style={style.text}>
            {DateHelper.getNumberOfDays(item.created_at)}
          </Text>
          {item.wanted_by_users && item.wanted_by_users?.length > 0 ? (
            <Text style={style.text}>
              {item.wanted_by_users?.length + " demandes en cours"}
            </Text>
          ) : (
            <Text style={style.text}>Aucune demande en cours</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={style.contentList}>
      {listOffers && listOffers.length > 0 && !loading ? (
        <FlatList
          data={listOffers}
          renderItem={itemOffer}
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
  contentList: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.red2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white1,
  },
  contentImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  contentText: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 12,
    color: COLORS.red2,
  },
});

export default MyDonnationsScreen;
