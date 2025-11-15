import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("ERRO LOGIN:", error)

      let msg = error.message

      if (msg.includes("Email not confirmed")) {
        msg = "Você precisa confirmar seu e-mail antes de entrar."
      }

      if (msg.includes("Invalid login credentials")) {
        msg = "Credenciais Inválidas!."
      }

      Toast.show({
        type: 'error',
        text1: 'Erro ao entrar juca',
        text2: msg,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Login realizado!',
        text2: 'Bem-vindo de volta 👋',
      })
    }

    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: error.message,
      })
    } else {
      // Sucesso no envio do e-mail de confirmação
      Toast.show({
        type: 'success',
        text1: 'Conta criada!',
        text2: 'Verifique seu e-mail para confirmar o cadastro.',
      })
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Acessar Conta</Text>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="seuemail@exemplo.com"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Digite sua senha"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={signInWithEmail}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonSecondary, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={signUpWithEmail}
      >
        <Text style={styles.buttonSecondaryText}>Criar Conta</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    marginLeft: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  verticallySpaced: {
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#0066cc",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonSecondary: {
    backgroundColor: "#e6e6e6",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonSecondaryText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonDisabled: {
    opacity: 0.6,
  },
})
