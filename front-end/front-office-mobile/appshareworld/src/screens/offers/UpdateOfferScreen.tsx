import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Platform,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { RadioButton, Checkbox, Switch } from "react-native-paper";
import NsOffer from "../../models/NsOffer";
import { COLORS } from "../../constant/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import config from "./../../config.json";
import NsCategory from "../../models/NsCategory";

enum State {
  CommeNeuf = "Comme neuf",
  BonEtat = "Bon état",
  EtatMoyen = "État Moyen",
  ABricoler = "À bricoler",
}

const UpdateOfferScreen: React.FC = ({ route }: any) => {
  const { oldOffer } = route.params;
  const [offer, setOffer] = useState<NsOffer.IOfferData>(
    JSON.parse(JSON.stringify(oldOffer))
  );
  const [render, setRender] = useState<JSX.Element>(<View></View>);
  const [categories, setCategories] = useState<NsCategory.ICategory[]>([]);
  const navigation = useNavigation();

  console.log(oldOffer);
  console.log(offer);

  useEffect(() => {
    // Mise à jour du titre du header
    navigation.setOptions({ title: oldOffer.label });

    // Récupération des catégories
    fetch(`http://${config.ip}:${config.port}/categories`)
      .then((res) => res.json())
      .then((result: NsCategory.ICategory[]) => {
        setCategories(result);
      });
  }, []);

  useEffect(() => {
    generateView(false);
  }, [offer, categories]);

  const updateOffer = async () => {
    if (
      offer.label !== oldOffer.label ||
      offer.description !== oldOffer.description ||
      offer.state !== oldOffer.state ||
      offer.status !== oldOffer.status ||
      offer.category_id !== oldOffer.category_id ||
      offer.is_owner_address !== oldOffer.is_owner_address ||
      offer.exchange_address.number !== oldOffer.exchange_address.number ||
      offer.exchange_address.street !== oldOffer.exchange_address.street ||
      offer.exchange_address.complement !==
        oldOffer.exchange_address.complement ||
      offer.exchange_address.zipcode !== oldOffer.exchange_address.zipcode ||
      offer.exchange_address.city !== oldOffer.exchange_address.city ||
      offer.display_mail !== oldOffer.display_mail ||
      offer.display_phone !== oldOffer.display_phone
    ) {
      await fetch(
        `http://${config.ip}:${config.port}/offers/update/${offer.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offer),
        }
      );
      // .then((response) => console.log(response.json()));
      if (offer.is_owner_address) {
        const newOffer: NsOffer.IOfferData = offer;
        if (newOffer.owner.address) {
          newOffer.exchange_address = newOffer.owner.address;
        }
      }
    }
    navigation.navigate("MyDonnationsScreen", {
      oldOffer: offer,
    });
  };

  const onChangeLabel = (text: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.label = text;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeDescription = (text: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.description = text;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeDisplayPhone = () => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.display_phone = !newOffer.display_phone;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeDisplayMail = () => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.display_mail = !newOffer.display_mail;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeNumberAddress = (value: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    (newOffer.exchange_address.number = value), 10;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeStreetAddress = (value: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.exchange_address.street = value;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeZipcodeAddress = (value: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.exchange_address.zipcode = value;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeCityAddress = (value: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.exchange_address.city = value;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeComlementAddress = (value: string) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.exchange_address.complement = value;
    setOffer(newOffer);
    generateView(false);
  };

  const onChangeIsOwnerAddress = () => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.is_owner_address = !newOffer.is_owner_address;
    setOffer(newOffer);
    generateView(false);
  };

  const defineTextIsOwnerAddress = (): string => {
    let result = "";
    if (offer.is_owner_address) {
      result = "Mon adresse";
    } else {
      result = "Une autre adresse";
    }
    return result;
  };

  const onChangeState = (newState: State) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.state = newState;
    setOffer(newOffer);
    generateView(false);
  };

  const generateRadioButtonState = (): JSX.Element[] => {
    const states: State[] = [
      State.CommeNeuf,
      State.BonEtat,
      State.EtatMoyen,
      State.ABricoler,
    ];
    let result: JSX.Element[] = [];
    for (const state of states) {
      result.push(
        <View
          key={"view-radioButton-state-" + state}
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        >
          <RadioButton
            key={"radioButton-state-" + state}
            value={state}
            color={COLORS.red1}
            status={offer.state === state ? "checked" : "unchecked"}
            onPress={() => onChangeState(state)}
          />
          <Text style={{ marginLeft: 10 }}>{state}</Text>
        </View>
      );
    }
    return result;
  };

  const onChangeCategory = (indexCategories: number) => {
    const newOffer: NsOffer.IOfferData = offer;
    newOffer.category_id = categories[indexCategories].id;
    setOffer(newOffer);
    generateView(false);
  };

  const generateRadioButtonCategories = (): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (const category of categories) {
      const index = category.id - 1;
      result.push(
        <View
          key={"view-radioButton-category-" + category.label}
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        >
          <RadioButton
            key={"radioButton-category-" + category.label}
            value={category.label}
            color={COLORS.red1}
            status={offer.category_id === category.id ? "checked" : "unchecked"}
            onPress={() => onChangeCategory(index)}
          />
          <Text style={{ marginLeft: 10 }}>{category.label}</Text>
        </View>
      );
    }
    return result;
  };

  const displayPictures = (): JSX.Element => {
    let result: JSX.Element[] = [];
    const pictures: NsOffer.IPictureData[] = offer.pictures;
    if (pictures.length < 4) {
      for (let i = 0; i < 3; i++) {
        result.push(
          <View key={"content-picture-" + i}>
            {pictures[i] ? (
              <Image
                key={"picture-" + i}
                style={style.image}
                source={{
                  uri: `http://${config.ip}:${config.port}/pictures/${pictures[i].url}`,
                }}
              />
            ) : (
              <Image
                key={"picture-" + i}
                style={style.image}
                source={require("../../assets/logo.png")}
              />
            )}
            <View
              key={"content-icon" + i}
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {pictures[i] ? (
                <Ionicons
                  name={"close"}
                  size={25}
                  color={COLORS.red1}
                  onPress={() => deletePicture(pictures[i].id, true)}
                />
              ) : (
                <Ionicons
                  name={"add"}
                  size={25}
                  color={COLORS.red1}
                  onPress={() => generateView(true)}
                />
              )}
            </View>
          </View>
        );
      }
    }
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {result}
      </ScrollView>
    );
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Désolé, mais nous avons besoin de votre permission pour accéder à la galerie"
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        savePicture(result);
      }
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Désolé, mais nous avons besoin de votre permission pour accéder à l'appareil photo"
      );
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (result) {
        savePicture(result);
      }
    }
  };

  const modal = (): JSX.Element => {
    let result: JSX.Element = <View></View>;
    result = (
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width - 16,
          height: Dimensions.get("window").height - 188,
          top: 8,
          left: 8,
          zIndex: 999,
          backgroundColor: COLORS.white1,
          borderWidth: 2,
          borderColor: COLORS.red1,
          borderRadius: 5,
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 50,
        }}
      >
        <TouchableHighlight
          onPress={takePicture}
          style={{
            width: 250,
            paddingVertical: 20,
            borderRadius: 5,
            backgroundColor: COLORS.red1,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            PRENDRE UNE PHOTO
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={pickImageFromGallery}
          style={{
            width: 250,
            paddingVertical: 20,
            borderRadius: 5,
            backgroundColor: COLORS.red1,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            SELECTIONNER UNE IMAGE
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            generateView(false);
          }}
          style={{
            width: 250,
            paddingVertical: 20,
            borderRadius: 5,
            backgroundColor: COLORS.red1,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>FERMER</Text>
        </TouchableHighlight>
      </View>
    );
    return result;
  };

  const savePicture = async (result: any) => {
    const data: FormData = new FormData();
    data.append("id", offer.id.toString());
    if (Platform.OS === "web") {
      const base64 = await fetch(result.uri);
      const blob = await base64.blob();
      data.append("image", blob);
    } else {
      if (!result.cancelled && result.type === "image" && result.uri) {
        data.append("image", result);
      }
    }

    // SAVE IMAGE
    if (offer.pictures.length < 4) {
      await fetch(`http://${config.ip}:${config.port}/pictures`, {
        method: "POST",
        body: data,
      })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

      // GET ALL IMAGES
      await fetch(`http://${config.ip}:${config.port}/pictures/${offer.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result: NsOffer.IPictureData[]) => {
          console.log(result);
          const newOffer: NsOffer.IOfferData = offer;
          newOffer.pictures = result;
          setOffer(newOffer);
        })
        .catch((e) => console.log(e));
    } else {
      alert(
        "Vous avez déjà atteint le maximum d'image enregistré pour cette offre"
      );
    }
    generateView(false);
  };

  const deletePicture = (id: number, reload: boolean) => {
    fetch(`http://${config.ip}:${config.port}/pictures/offers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    const newOffer: NsOffer.IOfferData = offer;
    const oldPictures: NsOffer.IPictureData[] = newOffer.pictures;
    let newPictures: NsOffer.IPictureData[] = [];
    for (const oldPicture of oldPictures) {
      if (oldPicture.id !== id) {
        newPictures.push(oldPicture);
      }
    }
    newOffer.pictures = newPictures;
    setOffer(newOffer);
    if (reload) {
      generateView(false);
    }
  };

  const generateView = (displayModal: boolean) => {
    const result: JSX.Element = (
      <View style={style.contentItem}>
        {displayModal && modal()}
        <View style={style.contentInput}>
          <Text style={style.labelInput}>IMAGES</Text>
          {displayPictures()}
        </View>
        <View style={style.contentInput}>
          <Text style={style.labelInput}>LABEL</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeLabel}
            value={offer.label}
            placeholder="Label"
          />
        </View>
        <View style={style.contentInput}>
          <Text style={style.labelInput}>DESCRIPTION</Text>
          <TextInput
            style={style.input}
            onChangeText={onChangeDescription}
            value={offer.description}
            placeholder="Description"
            multiline
          />
        </View>
        <View style={style.contentInput}>
          <Text style={style.labelInput}>ETAT</Text>
          {generateRadioButtonState()}
        </View>
        <View style={style.contentInput}>
          <Text style={style.labelInput}>CATEGORIE</Text>
          {generateRadioButtonCategories()}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.red1 }}>
            AFFICHER MON TELEPHONE
          </Text>
          <Checkbox
            color={COLORS.red1}
            status={offer.display_phone ? "checked" : "unchecked"}
            onPress={() => onChangeDisplayPhone()}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.red1 }}>
            AFFICHER MON EMAIL
          </Text>
          <Checkbox
            color={COLORS.red1}
            status={offer.display_mail ? "checked" : "unchecked"}
            onPress={() => onChangeDisplayMail()}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text
            style={{ fontWeight: "bold", color: COLORS.red1, marginBottom: 5 }}
          >
            ADRESSE D'ECHANGE
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.red1,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: COLORS.red1,
                }}
              >
                {defineTextIsOwnerAddress().toUpperCase()}
              </Text>
              <Switch
                value={offer.is_owner_address}
                onValueChange={onChangeIsOwnerAddress}
                color={COLORS.red1}
              />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              {offer.is_owner_address ? (
                <View
                  style={{
                    marginVertical: 10,
                    marginLeft: 10,
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text style={style.ownerAddress}>
                    {offer.owner?.address?.number +
                      " " +
                      offer.owner?.address?.street}
                  </Text>
                  <Text style={style.ownerAddress}>
                    {offer.owner?.address?.complement}
                  </Text>
                  <Text style={style.ownerAddress}>
                    {" "}
                    {offer.owner?.address?.zipcode +
                      " " +
                      offer.owner?.address?.city}
                  </Text>
                </View>
              ) : (
                <View style={{ marginLeft: 10 }}>
                  <View style={style.contentInput}>
                    <Text style={style.labelInputAddress}>NUMERO</Text>
                    <TextInput
                      style={style.input}
                      onChangeText={onChangeNumberAddress}
                      value={
                        offer.exchange_address.number
                          ? offer.exchange_address.number.toString()
                          : ""
                      }
                      placeholder="Numéro"
                    />
                  </View>
                  <View style={style.contentInput}>
                    <Text style={style.labelInputAddress}>RUE</Text>
                    <TextInput
                      style={style.input}
                      onChangeText={onChangeStreetAddress}
                      value={offer.exchange_address.street}
                      placeholder="Rue"
                    />
                  </View>
                  <View style={style.contentInput}>
                    <Text style={style.labelInputAddress}>CODE POSTAL</Text>
                    <TextInput
                      style={style.input}
                      onChangeText={onChangeZipcodeAddress}
                      value={offer.exchange_address.zipcode}
                      placeholder="Code Postal"
                    />
                  </View>
                  <View style={style.contentInput}>
                    <Text style={style.labelInputAddress}>VILLE</Text>
                    <TextInput
                      style={style.input}
                      onChangeText={onChangeCityAddress}
                      value={offer.exchange_address.city}
                      placeholder="Ville"
                    />
                  </View>
                  <View style={style.contentInput}>
                    <Text style={style.labelInputAddress}>COMPLEMENT</Text>
                    <TextInput
                      style={style.input}
                      onChangeText={onChangeComlementAddress}
                      value={offer.exchange_address.complement}
                      placeholder="Complément"
                      multiline
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            marginVertical: 50,
          }}
        >
          <TouchableHighlight onPress={updateOffer} style={style.button}>
            <Text style={{ color: "white" }}>MODIFIER</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("MyDonnationsScreen", { oldOffer: oldOffer })
            }
            style={style.button}
          >
            <Text style={{ color: "white" }}>ANNULER</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    setRender(result);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white1 }}>{render}</ScrollView>
  );
};

const style = StyleSheet.create({
  contentItem: {
    padding: 8,
    // marginBottom: 50,
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contentImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 250,
    height: 250,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.red1,
    borderRadius: 5,
  },
  contentInput: {
    marginVertical: 10,
  },
  labelInput: {
    marginBottom: 5,
    fontWeight: "bold",
    color: COLORS.red1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.red1,
    borderRadius: 5,
    padding: 10,
  },
  labelInputAddress: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 12,
    color: COLORS.red1,
  },
  button: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: COLORS.red1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ownerAddress: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateOfferScreen;
