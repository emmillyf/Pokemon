import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./style";
import tipos from "../../Assets/Tipos/tipos";
import { useFavoritos } from "../../Components/Favorites";

type RouteParams = {
  SobrePokemon: {
    pokemonUrl: string;
  };
};

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


export function SobrePokemon() {
  const route = useRoute<RouteProp<RouteParams, "SobrePokemon">>();
  const { pokemonUrl } = route.params;
  const navigation = useNavigation();

  const [pokemonData, setPokemonData] = useState<any>(null);
  const [descricao, setDescricao] = useState<string | null>(null);
  const [evolucao, setEvolucao] = useState<any[]>([]);
  const { favoritos, addFavorito, removeFavorito } = useFavoritos();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(pokemonUrl);
        setPokemonData(response.data);

        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );
        setDescricao(descriptionEntry ? descriptionEntry.flavor_text : "No description available.");

        const evolutionData = evolutionChainResponse.data.chain;
        const evolutionArray = [];
        let currentEvolution = evolutionData;

        while (currentEvolution) {
          const evolutionDetails = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${currentEvolution.species.name}`
          );
          evolutionArray.push({
            name: currentEvolution.species.name,
            image: evolutionDetails.data.sprites.front_default,
          });
          currentEvolution = currentEvolution.evolves_to[0];
        }

        setEvolucao(evolutionArray);
      } catch (error) {
        console.error("Erro ao buscar informações do Pokémon:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonUrl]);

  const favorito = pokemonData && favoritos.includes(pokemonData.name);

  const toggleFavorito = () => {
    if (pokemonData) {
      if (favorito) {
        removeFavorito(pokemonData.name);
      } else {
        addFavorito(pokemonData.name);
      }
    }
  };

  if (!pokemonData) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const backgroundColor = pokemonData.types.length ? tipoCor[pokemonData.types[0].type.name] : "#FFF";
  const color = pokemonData.types.length ? tipoCor[pokemonData.types[0].type.name] : "#FFF";

  return (
    <FlatList
      style={{ backgroundColor }}
      data={[{ key: "top-section" }, ...evolucao, { key: "bottom-section" }]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        if (item.key === "top-section") {
          return (
            <View style={styles.container_top}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../../Assets/setaVoltar.png")}
                  alt="seta de voltar"
                  style={styles.seta}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleFavorito}>
                <Image
                  source={
                    favorito
                      ? require("../../Assets/iconeFavoritoClicado.png")
                      : require("../../Assets/iconeFavorito.png")
                  }
                  alt="ícone de coração para favoritar pokemon"
                  style={styles.heart}
                />
              </TouchableOpacity>

              <Image
                source={{ uri: pokemonData.sprites.front_default }}
                alt={`Imagem de ${pokemonData.name}`}
                style={styles.pokemon}
              />

              <View style={styles.container_pokemon}>
                <Text style={styles.nome}>
                  {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                </Text>

                <Text style={styles.number}>
                  #{pokemonData.id.toString().padStart(3, "0")}
                </Text>

                <View style={{ flex: 1, flexDirection: "row" }}>
                  {pokemonData.types.map((typeInfo: any) => (
                    <Image
                      key={typeInfo.type.name}
                      source={tipos[typeInfo.type.name as keyof typeof tipos]}
                      style={styles.tipoImagem}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.sobrePokemon}>Sobre o Pokémon:</Text>
            </View>
          );
        } else if (item.key === "bottom-section") {
          return (
            <View style={styles.container_bottom}>
              <Text style={[styles.topicos, { color }]}>Descrição:</Text>
              <Text style={styles.text}>{descricao}</Text>

              <Text style={[styles.topicos, { color }]}>Habilidades:</Text>
              {pokemonData.abilities.map((abilityInfo: any) => (
                <Text key={abilityInfo.ability.name} style={styles.text}>
                  {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
                </Text>
              ))}

              <Text style={[styles.topicos, { color }]}>Evoluções:</Text>
              {evolucao.map((evolution: any, index: number) => (
                <View style={styles.evolucao_container} key={index}>
                  <Image
                    source={{ uri: evolution.image }}
                    style={styles.evolucao_img}
                  />
                  {index !== evolucao.length - 1 && (
                    <Image
                      source={require("../../Assets/iconeSetaBaixo.png")}
                      alt="seta para baixo"
                      style={{
                        tintColor: backgroundColor,
                        top: 120,
                        right: 50,
                        width: 65,
                        height: 65,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          );
        } else {
          return null;
        }
      }}
    />
  );
}