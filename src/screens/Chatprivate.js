import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { auth, database } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../config';
import { collection, addDoc } from 'firebase/firestore';
import Login from './Login';
import Signup from './Signup';
export default function Chatprivate () {
    const [currentPage, setCurrentPage] = useState('');
    const [username, setUsername] = useState(null);
    switch (currentPage) {
        case 'login':
            return <Login username={username} setUsername={setUsername} setCurrentPage={setCurrentPage} />;
        case 'signup':
            return <Signup setCurrentPage={setCurrentPage} />;
        case 'home':
            return <Home setCurrentPage={setCurrentPage} />;
        default:
            return <Login setCurrentPage={setCurrentPage} />;
    }
}



const styles = StyleSheet.create({})