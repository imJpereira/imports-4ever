import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await axios.post('http://192.168.0.11:8765/auth/signup', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      await signIn({ email, password });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar. Verifique os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>4ever{"\n"}Imports</Text>
      <Text style={styles.subtitle}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <AntDesign name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <AntDesign name="mail" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Digite seu email:"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Senha:"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
        <Text style={styles.bottomText}>
          Já possui uma conta?{' '}
          <Text style={styles.link}>
            Entrar
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    marginTop: -10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#06C823',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  link: {
    color: '#0000EE',
    fontWeight: 'bold',
  },
});
