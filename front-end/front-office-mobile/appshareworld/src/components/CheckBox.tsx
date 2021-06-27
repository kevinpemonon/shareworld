import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { COLORS } from "../constant/colors";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

interface Props {
  label: string;
}

export const CheckBox = ({ label }: Props) => {
  const iconCheck: string = "checkbox-outline";
  const iconUncheck: string = "square-outline";
  const [icon, setIcon] = useState<any>(iconUncheck);

  const onChangeCheck = () => {
    if (icon === iconCheck) {
      setIcon(iconUncheck);
    } else {
      setIcon(iconCheck);
    }
  };
  return (
    <TouchableOpacity
      onPress={onChangeCheck}
      style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
    >
      <Ionicons name={icon} color={COLORS.red1} size={25} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
