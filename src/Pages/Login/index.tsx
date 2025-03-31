import React from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./style";
import iconeLogin from "../../Assets/iconeLogin.png";
import { TextInputComponent } from "../../Components/TextInput";
import { ButtonComponents } from "../../Components/ButtonComponents";
import { useAuth } from "../../Hooks/useAuth";

export const Login = () => {
  const { nome, setNome, setPassword, password, loginAutentication } =
    useAuth();

  const handleNome = (value: string) => setNome(value);

  const handlePassword = (value: string) => setPassword(value);

  const handleLogin = () => {
    loginAutentication(nome, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={iconeLogin} style={styles.image} />
          </View>
          <View>
            <Text style={styles.bemvindo}>Bem-vindo!</Text>
          </View>
          <View>
            <Text style={styles.autentic}>Autenticação</Text>
          </View>

          <TextInputComponent
            recebeplaceholder="Digite seu nome"
            recebefuncao={handleNome}
            recebetipoinput={false}
            recebevalue={nome}
          />

          <TextInputComponent
            recebeplaceholder="Digite sua senha"
            recebefuncao={handlePassword}
            recebetipoinput={true}
            recebevalue={password}
          />

          <ButtonComponents title="Entrar" recebefuncao={handleLogin} />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};
