import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Home } from "../Pages/Home";
import { Image, Text, TouchableOpacity, View } from "react-native";
import iconehome from "../Assets/iconeHome.png";
import { Perfil } from "../Pages/Perfil";
import Person from "../Assets/iconePerfil.png";
import { Login } from "../Pages/Login";
import Sair from "../Assets/iconeSair.png";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

const TabAll = createBottomTabNavigator();

export function BottomTabRoutes() {
  const navigation = useNavigation();

  const navegando = useNavigation();

  const handleLogout = () => {
    navegando.navigate("StackLogin", { name: "Login" });
  };

  return (
    <TabAll.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      }}
    >
      <TabAll.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.containerStyle}>
              <Image
                source={iconehome}
                style={{
                  tintColor: focused ? "#EA5D60" : "#000",
                  width: 32,
                  height: 32,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? "#EA5D60" : "#000",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <TabAll.Screen
        name="Sobre"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.containerStyle}>
              <Image
                source={Person}
                style={{
                  tintColor: focused ? "#EA5D60" : "#000",
                  width: 32,
                  height: 32,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? "#EA5D60" : "#000",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />

      <TabAll.Screen
        name="Sair"
        component={Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.containerStyle}>
              <Image
                source={Sair}
                style={{
                  tintColor: focused ? "#EA5D60" : "#000",
                  width: 32,
                  height: 32,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? "#EA5D60" : "#000",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Sair
              </Text>
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={handleLogout} />
          ),
        }}
      />
    </TabAll.Navigator>
  );
}
