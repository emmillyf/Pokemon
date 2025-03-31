import { useNavigation } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type PropsContexto = {
  nome: string;
  setNome: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loginAutentication: (nome: string, password: string) => void;
};

const ContextoAll = createContext<PropsContexto>({
  nome: "",
  setNome: () => {},
  password: "",
  setPassword: () => {},
  loginAutentication: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [nome, setNome] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navegando = useNavigation();

  const loginAutentication = (nome: string, password: string) => {
    if (nome === "" || password === "") {
      Alert.alert("Credenciais inválidas");
    } else {
      storedData(nome);
      navegando.navigate("StackTabsPages", { name: "Login" });
    }
  };

  async function storedData(nome: string) {
    await AsyncStorage.setItem("@App1", nome);
  }

  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("@App1");
      if (value !== null) {
        console.log("Dados resgatados", value);
      }
    } catch (error) {
      console.log("Não foi possível resgatar os dados!");
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <ContextoAll.Provider
      value={{ nome, setNome, password, setPassword, loginAutentication }}
    >
      {children}
    </ContextoAll.Provider>
  );
};

export const useAuth = () => useContext(ContextoAll);
