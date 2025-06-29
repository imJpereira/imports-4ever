import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function SignInScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Informe email e senha');
      return;
    }

    try {
      await signIn({ email, password });
   
    } catch (error) {
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>4ever{"\n"}Imports</Text>
      <Text style={styles.subtitle}>Entrar</Text>

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

      <TouchableOpacity>
        <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.bottomText}>
          Ainda não possui uma conta?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
            Cadastre-se
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
  forgotText: {
    textAlign: 'right',
    color: '#555',
    marginBottom: 20,
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
