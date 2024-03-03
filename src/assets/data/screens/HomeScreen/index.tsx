import React, { Component, useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, View, TextInput, Modal } from 'react-native';

import _ from 'lodash';

// import connect to connect with redux store
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, getMoreNotes, getCategories } from '../../public/redux/slices';

import Card from '../../components/Card';
import Fab from '../../components/Fab';
import SortModal from '../../components/SortModal';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

const HomeScreen = ({navigation}) => {

    const notes = useSelector((state: any) => state.notes);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            console.log(JSON.stringify(notes.data))
            fetchData();
        }, []),
    );

    useFocusEffect(
        useCallback(() => {
        }, [searchText]),
    );
    const searchData = (search: string) => {
        setSearchText(search);
        console.log(search)
        let { sort, selectedCategory } = notes;
        dispatch(getNotes({ sort, search, selectedCategory }));
    }
    const debounceFn = useCallback(_.debounce(searchData, 1000), []);
    const [homeState, setHomeState] = useState({
        _ModalVisible: false,
        search: '',
        notes: []
    })
    const setModalVisibility = (bool: boolean) => {
        setHomeState({...homeState, _ModalVisible: bool });
    }
    const fetchData = () => {
        let { sort, search, selectedCategory } = notes;
        dispatch(getNotes({ sort, search, selectedCategory }));
        dispatch(getCategories());
    }
    const loadMore = () => {
        let { sort, nextPage, search, selectedCategory } = notes;
        dispatch(getMoreNotes({ sort, search, nextPage, selectedCategory }));
    }

    // useEffect(() => {
    //     return () => {
    //         subs.forEach(sub => {
    //             sub.remove()
    //         })
    //     };
    // }, []);
    const _onRefresh = () => {
        let selectedCategory = "";
        let sort = "";
        let search = "";
        dispatch(getNotes({ sort, search, selectedCategory }));
        dispatch(getCategories());
    }
    const _keyExtractor = (item, index) => item.id;

        return (

            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Search..."
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        onChangeText={debounceFn}
                    />
                </View>
                {
                    notes.isLoading ?
                        <ActivityIndicator style={styles.activityIndicator} size="large" color="#000" /> :
                        notes.isError ?
                            <Text>Error, please try again!</Text>
                            : (
                                <FlatList
                                    style={styles.noteList}
                                    data={notes.data}
                                    keyExtractor={_keyExtractor}
                                    numColumns={2}
                                    onRefresh={_onRefresh}
                                    refreshing={notes.isLoading}
                                    renderItem={({ item }) => <Card title={item.title} category={item.category} note={item.note} navigation={navigation} />}
                                    onEndReachedThreshold={0.1}
                                    onEndReached={({ distanceFromEnd }) => { loadMore() }}
                                />
                            )
                }
                <Fab navigation={navigation} />
                <Modal transparent={true} visible={homeState._ModalVisible} onRequestClose={() => setModalVisibility(false)}>
                    <SortModal navigation={navigation} setModalVisibility={setModalVisibility} />
                </Modal>
            </View>
        );
    
}
export default HomeScreen;


