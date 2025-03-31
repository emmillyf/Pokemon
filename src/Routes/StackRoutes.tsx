import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../Pages/Login";
import { BottomTabRoutes } from "./BottomTabRoutes";
import { AuthProvider } from "../Hooks/useAuth";
import { SobrePokemon } from "../Pages/Sobre";

export type ParametrosDaRota = {
  StackLogin: { name: string };
  StackTabsPages: { name: string };
  SobrePokemon: { name: string };
};

const StackNavegacao = createNativeStackNavigator<ParametrosDaRota>();

export function StackRoutes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavegacao.Navigator screenOptions={{ headerShown: false }}>
          <StackNavegacao.Screen name="StackLogin" component={Login} />
          <StackNavegacao.Screen
            name="StackTabsPages"
            component={BottomTabRoutes}
          />
          <StackNavegacao.Screen name="SobrePokemon" component={SobrePokemon} />
        </StackNavegacao.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
