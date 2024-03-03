import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';

const Fab = ({ navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')} style={styles.fab}>
            {/*<FontAwesomeIcon icon={ faPlus } size={20}/>*/}
        </TouchableOpacity>
    );

}

export default Fab;
