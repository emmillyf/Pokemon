import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card_container: {
    width: 326,
    height: 114,
    borderRadius: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "space-around",
    gap: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  card_fundo: {
    height: 114,
    width: "85%",
    position: "absolute",
    right: 0,
  },
  card_nome: {
    alignSelf: "center",
    paddingLeft: 25,
  },
  card_nome_numero: {
    fontFamily: "Inter_300Light",
    color: "#747476",
    fontSize: 14,
  },
  card_nome_pokemon: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    fontSize: 24,
  },
  card_imagem: {
    height: 142,
    width: 142,
    position: "absolute",
    right: 10,
    top: -15,
  },
});
