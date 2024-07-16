import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../config/firebase";

const RegisterScreen = ({ navigation }) => {
  const [username, setusuario] = useState('');
  const [password, setcontraseña] = useState('');
  const [email, setcorreo] = useState('');

  const auth = getAuth(app);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Éxito', 'Cuenta registrada exitosamente');
        irLogin();
        const user = userCredential.user;
        console.log(user);
        setusuario("");
        setcorreo("");
        setcontraseña("");
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

    const irLogin = async () => {
      navigation.navigate('Login');
    };

    return (
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setusuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setcorreo}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setcontraseña}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      padding: 10,
    },
  });

  export default RegisterScreen;
