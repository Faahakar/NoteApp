import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';

const Fab = ({ navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')} style={styles.fab}>
            {<Button icon='plus'>Add Note</Button>}
        </TouchableOpacity>
    );

}

export default Fab;
