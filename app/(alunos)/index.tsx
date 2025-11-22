import { StyleSheet} from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CadastrosGeraisScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <ThemedText type="title" style={styles.title}>
        Cadastros Gerais
      </ThemedText>

      {/* Links tipo Linktree */}
      <ThemedView style={styles.linksContainer}>


      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    backgroundColor: "#fff",
    
  },

  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  linksContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },

  linkButton: {
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "#2D2E31",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  linkText: {
    color: "#fff",
    fontSize: 18,
  },
});
