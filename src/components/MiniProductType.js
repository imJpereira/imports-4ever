import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MiniProductType({ type, onPress, smaller, bigger }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.typeContainer,
        smaller && styles.typeContainerSmall,
        bigger && styles.typeContainerBig,
      ]}
    >
      <Text
        style={[
          styles.typeName,
          smaller && styles.typeNameSmall,
          bigger && styles.typeNameBig,
        ]}
      >
        {type.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  typeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: 170,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#06C823",
  },
  typeContainerSmall: {
    width: 120,
    height: 45,
  },
  typeContainerBig: {
    width: 140, 
    height: 100, 
  },
  typeName: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  typeNameSmall: {
    fontSize: 14,
  },
  typeNameBig: {
    fontSize: 24,
  },
});
