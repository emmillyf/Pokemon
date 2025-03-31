import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { useAuth, PropsContexto } from "../../Hooks/useAuth";
import { styles } from "./style";
import iconeHome from "../../Assets/iconeHome.png";
import { useNavigation } from "@react-navigation/native";
import dog from "../../Assets/dog.webp";
import { useFavoritos } from "../../Components/Favorites";
import coracaofav from "../../Assets/coracaofav.png";

const options = [
  {
    title: "Pokedex",
    icon: iconeHome,
    link: "https://www.pokemon.com/br/pokedex",
  },
  {
    title: "Assistir Pokémon",
    icon: iconeHome,
    link: "https://www.pokemon.com/br/dibujos-animados",
  },
  {
    title: "Jogar Pokémon GO",
    icon: iconeHome,
    link: "https://pokemongolive.com/?hl=pt_BR",
  },
];

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export function Perfil() {
  const { nome } = useAuth() as PropsContexto;
  const { favoritos } = useFavoritos();
  const navigation = useNavigation();
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await Promise.all(
          favoritos.map(async (pokemonName) => {
            const response = await fetch(
              `${BASE_URL}/${pokemonName.toLowerCase()}`
            );
            if (!response.ok) {
              throw new Error("Não foi possível obter os dados do Pokémon");
            }
            return response.json();
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error("Erro ao buscar dados dos Pokémon favoritados:", error);
      }
    };

    fetchPokemonData();
  }, [favoritos]);

  const handleOptionPress = (link: string) => {
    Linking.openURL(link).catch((err) =>
      console.error("Erro ao abrir o link:", err)
    );
  };

  const primeiraLetraMaiuscula = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../Assets/setaVoltar.png")}
          alt="seta de voltar"
          style={styles.seta}
        />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image source={dog} style={styles.profileImage} />
        <Text style={styles.greeting}>Olá, {nome}!</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionItem,
              index === options.length - 1 && styles.lastOptionItem,
            ]}
            onPress={() => handleOptionPress(option.link)}
          >
            <Image source={option.icon} style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.favoritosContainer}>
        <Image source={coracaofav} style={styles.optionFav} />
        <Text style={styles.favoritosTitle}>Pokémons Favoritados:</Text>
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon, index) => (
            <View key={index} style={styles.favoritoItemContainer}>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.pokemonImage}
              />
              <Text style={styles.favoritosItem}>
                {primeiraLetraMaiuscula(pokemon.name)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.favoritosItem}>
            Nenhum Pokémon favoritado ainda.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
