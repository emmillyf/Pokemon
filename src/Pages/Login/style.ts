import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  image: {
    width: 225,
    height: 225,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#EA5D60",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  bemvindo: {
    textAlign: "center",
    marginBottom: 19,
    fontSize: 40,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
  },
  autentic: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_400Regular",
  },
});
