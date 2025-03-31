import React from "react";
import { styles } from "./style";
import { Text, TouchableOpacity, View } from "react-native";

type PropsButton = {
  title: string;
  recebefuncao: () => void;
};

export function ButtonComponents({ title, recebefuncao }: PropsButton) {
  return (
    <>
      <TouchableOpacity onPress={recebefuncao}>
        <View style={styles.buttonContainer}>
          <Text style={styles.textButton}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
