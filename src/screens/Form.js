import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { auth, database } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../config';
import { collection, addDoc } from 'firebase/firestore';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user);
                addDoc(collection(database, "personne"), {
                    name: name,
                    email: email,
                    password: password,
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setError(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(name) => setName(name)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
            <Button title="Register" onPress={handleRegister} />
            <Text style={styles.error}>{error}</Text>
            <Text style={styles.text}>Already have an account?</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
})