import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Routes } from "./src/Routes";
import { FavoritosProvider } from "./src/Components/Favorites";

export default function App() {
  const [fonteLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fonteLoaded) {
    return null;
  }

  return (
    <FavoritosProvider>
      <StatusBar style="auto" />
      <Routes />
    </FavoritosProvider>
  );
}