import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [resultado, setResultado] = useState("forneça peso e altura");
  const [peso, setPeso] = useState(undefined);
  const [altura, setAltura] = useState(undefined);

  function imc(massa, cumprimento) {
    return massa / (cumprimento * cumprimento);
  }

  function trataMudanca(massa, cumprimento) {
    if (valorInvalido(massa)) {
      setResultado("forneça um valor para a massa...");
      return;
    }

    if (valorInvalido(cumprimento)) {
      setResultado("forneça um valor para a altura...");
      return;
    }

    const valor = imc(massa, cumprimento);
    const msg = Number.isNaN(valor) ? "estranho?!" : valor;
    setResultado(msg);
  }

  function valorInvalido(valor) {
    // parseFloat trata 23xyz, por exemplo, como xyz
    const numero = Number.parseFloat(valor);
    return Number.isNaN(numero) ? true : valor != numero.toString();
  }

  function pesoChanged(pesoFornecido) {
    setPeso(pesoFornecido);
    trataMudanca(pesoFornecido, altura);
  }

  function alturaChanged(alturaFornecida) {
    setAltura(alturaFornecida);
    trataMudanca(peso, alturaFornecida);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>IMC</Text>
      <Text>Índice de Massa Corporal</Text>

      <TextInput
        style={styles.peso}
        placeholder="peso (kg), por exemplo, 65.9"
        onChangeText={pesoChanged}
        value={peso}
      />

      <TextInput
        style={styles.peso}
        placeholder="sua altura (m), por exemplo, 1.74"
        onChangeText={alturaChanged}
        value={altura}
      />

      <Text>{resultado}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },

  peso: {
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    width: 80,
  },
});
