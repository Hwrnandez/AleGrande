import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../config/firebase"; // Importar la instancia de app de firebase.js

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Éxito', 'Sesión iniciada exitosamente');
                const user = userCredential.user;
                console.log(user);
                setEmail("");
                setPassword("");
                goToHome();
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message);
            });
    };

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const goToRegister = () => {
        navigation.navigate('Registro');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToRegister}>
                <Text style={styles.signupText}>
                    ¿No tienes una cuenta? <Text style={styles.signupLink}>Regístrate</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 10,
    },
    button: {
        width: '80%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    signupText: {
        marginTop: 20,
        fontSize: 16,
    },
    signupLink: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
