import React, {Component, useState} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
// import connect to connect with redux store
import { connect, useDispatch } from 'react-redux';

// import action
import { getNotes } from '../../public/redux/slices';

const SortModal = ({navigation, ...props}) => {


        const [modalWidth, setModalWidth] = useState({
            width: Dimensions.get('window').width,
        })

        const dispatch = useDispatch();
        Dimensions.addEventListener('change', (e) => {
            setModalWidth(e.window);
        });
    

    const closeModal = () => {
         props.setModalVisibility(false);
    }
    const sortData = (sort) =>{
        let {search, selectedCategory} = props.notes;
        dispatch(getNotes({sort, search, selectedCategory}));
    }

    
        return (
            <View style={styles.contentContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.contentSide} onPress={() => closeModal()} ></TouchableOpacity>
                <View style={styles.modal /*{width: this.state.width * 0.4}*/}>
                    <TouchableOpacity onPress={() => sortData('ASC')} style={styles.buttonView}>
                        <Text style={styles.text}> ASCENDING </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sortData('DESC')} style={styles.buttonView}>
                        <Text style={styles.text}> DESCENDING </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    
}

export default SortModal
