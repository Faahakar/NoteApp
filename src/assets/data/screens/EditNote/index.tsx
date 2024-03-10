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



const LogInUser = ({ navigation, ...props }) => {
    const dispatch = useDispatch();
    const  [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const logInAndReturn = async(login: any) =>{
        dispatch(updateNotes());
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign-In</Text>
            <TextInput placeholder="Enter your username" onChangeText={(text) => setLogin({ ...login, email: text })} />
            <TextInput placeholder="Enter your password" onChangeText={(text) => setLogin({ ...login, password: text })} />
            <View>
            
                <Button icon="account" mode="contained" onPress={() => logInAndReturn(login)}>
                    Sign-in
                </Button>
            </View>
        </View>
    );
}


export default LogInUser;