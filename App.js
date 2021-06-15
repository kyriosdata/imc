import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  const [resultado, setResultado] = useState("forneça peso e altura");
  const [qualidade, setQualidade] = useState("");
  const [peso, setPeso] = useState(undefined);
  const [altura, setAltura] = useState(undefined);

  /**
   * Calcula IMC com duas casas decimais.
   *
   * @param {number} massa Massa em Kg.
   * @param {number} cumprimento Altura em m.
   * @returns IMC com duas casas decimais.
   */
  function imc(massa, cumprimento) {
    const calculo = massa / (cumprimento * cumprimento);
    return Math.floor(calculo * 100) / 100;
  }

  function qualitativo(massa) {
    if (massa < 18.5) {
      return "magreza";
    }

    if (massa < 24.9) {
      return "normal";
    }

    if (massa < 29.9) {
      return "sobrepeso";
    }

    if (massa < 39.9) {
      return "obesidade";
    }

    return "obseidade grave";
  }

  function trataMudanca(massa, cumprimento) {
    if (valorInvalido(massa)) {
      setResultado("forneça um valor para a massa...");
      setQualidade("");
      return;
    }

    if (valorInvalido(cumprimento)) {
      setResultado("forneça um valor para a altura...");
      setQualidade("");
      return;
    }

    const valor = imc(massa, cumprimento);
    if (Number.isNaN(valor)) {
      setResultado("estranho?!");
      setQualidade("");
    } else {
      setResultado(valor, qualitativo(valor));
      setQualidade(qualitativo(valor));
    }
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

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Massa (kg):</Text>
        <TextInput
          style={styles.entrada}
          placeholder="peso (kg), por exemplo, 65.9"
          onChangeText={pesoChanged}
          value={peso}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Altura (m): </Text>
        <TextInput
          style={styles.entrada}
          placeholder="sua altura (m), por exemplo, 1.74"
          onChangeText={alturaChanged}
          value={altura}
        />
      </View>

      <View style={styles.resultado}>
        <Text style={styles.imc}>Valor resultante (IMC):</Text>
        <Text style={styles.valor}>{resultado}</Text>
        <Text style={styles.qualidade}>{qualidade}</Text>
      </View>

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

  entrada: {
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    width: 80,
    backgroundColor: "lightgrey",
    paddingHorizontal: 8,
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },

  rotulo: {
    fontWeight: "bold",
    paddingRight: 10,
  },

  imc: {
    fontWeight: "bold",
  },

  resultado: {
    alignItems: "center",
    paddingTop: 25,
  },

  valor: {
    fontSize: 23,
    paddingTop: 10,
  },
});
