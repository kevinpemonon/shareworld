import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { authService } from "../../services/auth.service";
import { checkMail, checkPassword, checkStr } from "../../functions/checkInput";
import { useNavigation } from "@react-navigation/native";

enum Address_input {
  STREET,
  CITY,
  ZIPCODE,
  COMPLEMENT,
  NUMBER_STREET,
}

export interface Address_Complete {
  street: string;
  city: string;
  zipcode: string;
  complement: string;
  number: number;
  latitude: number;
  longitude: number;
}

const SignUpScreen: React.FC = () => {
  //*? Initialize State value

  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [setUrlAvatar] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState<Address_Complete>({
    street: "",
    city: "",
    zipcode: "",
    complement: "",
    number: 0,
    latitude: 0,
    longitude: 0,
  });
  const navigationHook = useNavigation();

  const comparePassword = (password: string, confirmpassword: string) => {
    return password === confirmpassword;
  };

  const updateAddressInput = (str: string, champ: number) => {
    const newAddress = address;
    if (champ === Address_input.CITY) {
      newAddress.city = str;
    } else if (champ === Address_input.COMPLEMENT) {
      newAddress.complement = str;
    } else if (champ === Address_input.NUMBER_STREET) {
      newAddress.number = parseInt(str, 10);
    } else if (champ === Address_input.STREET) {
      newAddress.street = str;
    } else if (champ === Address_input.ZIPCODE) {
      newAddress.zipcode = str;
    }
    setAddress(newAddress);
  };

  // ? check Email and password

  const onClickSubmit = () => {
    console.log("START");
    if (!checkStr(lastname, 3, 26)) {
      console.log("Nom de famille incorrect");
      return;
    }
    if (!checkStr(firstname, 3, 26)) {
      console.log("Prénom incorrect");
      return;
    }
    if (!checkMail(mail)) {
      console.log("mail format incorrect");
      return;
    }
    if (!comparePassword(password, confirmpassword)) {
      console.log(
        "mot de passe et confirmation de celui-ci ne sont pas identique"
      );
      return;
    }
    if (!checkPassword(password)) {
      console.log("mauvais format mot de passe");
      return;
    }
    console.log("DONE");
    authService.register_service(
      firstname,
      lastname,
      phone,
      50,
      mail,
      password,
      address
    );
    navigationHook.navigate("ProfileScreen");
  };

  return (
    <ScrollView>
      {/* <Image
        style={styles.logo}
        source={require("../../../../appshareworld/assets/png2pdf.pdf.png")}
      /> */}
      <Text>
        Veuillez remplir les informations demandés pour avoir commencer
        l'utilisation de l'application
      </Text>
      <Text>SignUp</Text>

      <View style={styles.inputView}>
        <TextInput
          testID={"lastname"}
          style={styles.TextInput}
          placeholder="Nom de Famille"
          placeholderTextColor="#E9383F"
          onChangeText={(lastname) => setLastName(lastname)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          testID={"firstname"}
          style={styles.TextInput}
          placeholder="Prénom"
          placeholderTextColor="#E9383F"
          onChangeText={(firstname) => setFirstName(firstname)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          testID={"phone"}
          style={styles.TextInput}
          placeholder="Téléphone"
          placeholderTextColor="#E9383F"
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          testID={"avatar"}
          style={styles.TextInput}
          placeholder="AvatarUrl"
          placeholderTextColor="#E9383F"
          onChangeText={(urlavatar) => setUrlAvatar(urlavatar)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          testID={"email"}
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#E9383F"
          onChangeText={(mail) => setMail(mail)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"password"}
          style={styles.TextInput}
          placeholder="Mot de passe"
          placeholderTextColor="#E9383F"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"verifypassword"}
          style={styles.TextInput}
          placeholder="Confirmation mot de passe"
          placeholderTextColor="#E9383F"
          secureTextEntry={true}
          onChangeText={(confirmpassword) =>
            setConfirmPassword(confirmpassword)
          }
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          testID={"number"}
          style={styles.TextInput}
          placeholder="Number"
          placeholderTextColor="#E9383F"
          onChangeText={(value) =>
            updateAddressInput(value, Address_input.NUMBER_STREET)
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"street"}
          style={styles.TextInput}
          placeholder="Street"
          placeholderTextColor="#E9383F"
          onChangeText={(value) =>
            updateAddressInput(value, Address_input.STREET)
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"addressmore"}
          style={styles.TextInput}
          placeholder="Complement"
          placeholderTextColor="#E9383F"
          onChangeText={(value) =>
            updateAddressInput(value, Address_input.COMPLEMENT)
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"city"}
          style={styles.TextInput}
          placeholder="City"
          placeholderTextColor="#E9383F"
          onChangeText={(value) =>
            updateAddressInput(value, Address_input.CITY)
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID={"zipcode"}
          style={styles.TextInput}
          placeholder="ZipCode"
          placeholderTextColor="#E9383F"
          onChangeText={(value) =>
            updateAddressInput(value, Address_input.ZIPCODE)
          }
        />
      </View>
      <TouchableOpacity onPress={onClickSubmit} testID={"submit"}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#E9383F",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "#FFF",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  logo: {
    width: "20%",
    height: "20%",
  },
  inputView: {
    backgroundColor: "#E9383F",
    borderRadius: 30,
    width: "70%",
    height: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});

export default SignUpScreen;
