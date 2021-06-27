import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { authService } from "../../services/auth.service";
import { StackActions } from "@react-navigation/native";
import ProfileStack from "../../routes/navigator";

import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../../constant/colors";

export const SignInScreen: React.FC = ({ navigation }: any) => {
  // ? Initialize State value

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Retrieve store value
  const my_user: IUser = useSelector((state: UserState) => state.user);
  const navigationHook = useNavigation();

  const dispatch: Dispatch<any> = useDispatch();

  const signIn = () => {
    authService.login_service(email, password, dispatch);

    navigationHook.navigate("ProfileScreen");

    // const pushAction = StackActions.push('ProfileScreen');

    // navigation.dispatch(pushAction);
  };

  // const test = () => {
  //   console.log(window.localStorage.getItem('accessToken'));
  // }

  console.log("DONE");
  return (
    <ScrollView
      style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 40 }}
    >
      {/* <Text>Last name: {my_user.last_name}</Text>
      <Text>Token: {my_user.accessToken}</Text>
      <Text>Token: {my_user.refreshToken}</Text> */}
      <View>
        {/* <View style={styles.inputView}>
          <TextInput
            testID={"email"}
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#E9383F"
            onChangeText={(email) => setEmail(email)}
          />
        </View> */}
        {/* <View style={styles.inputView}>
          <TextInput
            testID={"password"}
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#E9383F"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View> */}
        <View style={styles.contentInput}>
          <Text style={styles.labelInput}>EMAIL</Text>
          <TextInput
            testID={"email"}
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
          />
        </View>
        <View style={styles.contentInput}>
          <Text style={styles.labelInput}>MOT DE PASSE</Text>
          <TextInput
            testID={"password"}
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            placeholder="Mot de passe"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={signIn} style={styles.loginBtn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              MOT DE PASSE OUBLIE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigationHook.navigate("SignUpScreen");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              CREER UN COMPTE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button title='cc' onPress={test}>test</Button> */}
    </ScrollView>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//       addUser: user => dispatch(addUser(user))
//   }
// };

// export default connect(null, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  logo: {
    width: "20%",
    height: "20%",
  },
  inputView: {
    backgroundColor: "#E9383F",
    borderRadius: 30,
    // width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    width: "100%",
    height: 50,
    padding: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9383F",
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
    padding: 15,
  },
});
