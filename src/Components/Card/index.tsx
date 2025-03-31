import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import fundoCard from "../../Assets/fundoCard.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

interface CardProps {
  name: string;
  url: string;
}

const tipoCor: { [key: string]: string } = {
  bug: "#8BD674",
  dark: "#6F6E78",
  dragon: "#7383B9",
  electric: "#F2CB55",
  fairy: "#EBA8C3",
  fighting: "#EB4971",
  fire: "#FFA756",
  flying: "#83A2E3",
  ghost: "#8571BE",
  grass: "#8BBE8A",
  ground: "#F78551",
  ice: "#91D8DF",
  normal: "#B5B9C4",
  poison: "#9F6E97",
  psychic: "#FF6568",
  rock: "#D4C294",
  steel: "#4C91B2",
  water: "#58ABF6",
};

export function Card({ name, url }: CardProps) {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState<string | null>(null);
  const [pokemonNumber, setPokemonNumber] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(url);
        setPokemonImage(response.data.sprites.front_default);
        setPokemonNumber(response.data.id.toString().padStart(3, "0"));
        setPokemonType(response.data.types[0].type.name);
      } catch (error) {
        console.error("Erro ao requerer informações de pokémon: ", error);
      }
    };

    fetchPokemonData();
  }, [url]);

  const backgroundColor = pokemonType ? tipoCor[pokemonType] : "#FFF";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SobrePokemon", { pokemonUrl: url })}
    >
      <View style={[styles.card_container, { backgroundColor }]}>
        <Image source={fundoCard} style={styles.card_fundo} />
        <View style={styles.card_nome}>
          <Text style={styles.card_nome_numero}>#{pokemonNumber}</Text>
          <Text style={styles.card_nome_pokemon}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </View>
        {pokemonImage && (
          <Image source={{ uri: pokemonImage }} style={styles.card_imagem} />
        )}
      </View>
    </TouchableOpacity>
  );
}
