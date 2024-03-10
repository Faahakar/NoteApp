import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import categoryData from '../../categories.json';
import { insertNotes, logIn } from '../../public/redux/slices';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useSelector } from 'react-redux';



const LogInUser = ({ navigation, ...props }) => {
    const isLoggedIn = useSelector((state: any) => state.notes.loggedIn)
    const dispatch = useDispatch();
    const  [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const logInAndReturn = async(login: any) =>{
        dispatch(logIn(login));
        if(!isLoggedIn){
            console.log('failed to login');
            return;
        }
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign-In</Text>
            <TextInput placeholder="Enter your username" onChangeText={(text) => setLogin({ ...login, email: text })} />
            <TextInput placeholder="Enter your password" onChangeText={(text) => setLogin({ ...login, password: text })} />
            <View>
            
                <Button icon="account" mode="contained" onPress={async () => logInAndReturn(login)}>
                    Sign-in
                </Button>
            </View>
        </View>
    );
}


export default LogInUser;