import { StyleSheet, TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, inputConfig, style, invalid }) {
  return (
    <View style={[styles.rootContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          label === "Description"
            ? { minHeight: 100, textAlignVertical: "top" }
            : "",
            invalid && styles.invalidInput
        ]}
        {...inputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: "white",
    marginVertical: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    padding: 6,
  },
  invalidLabel:{
    color:GlobalStyles.colors.error500
  },
  invalidInput:{
backgroundColor:GlobalStyles.colors.error50
  }
});
