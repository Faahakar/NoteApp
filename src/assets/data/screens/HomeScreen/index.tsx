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
import { Button } from 'react-native-paper';

interface Note {
    id: number,
    title: string,
    note: string,
    categories: Category[],
    created_at: string,
    updated_at: string,
    cardColor: string,
}

interface Category {
    id: number,
    name: string,
    cardColor: string
}

const HomeScreen = ({ navigation }) => {
    const notes = useSelector((state: any) => state.notes);
    const [notesData, setNotesData] = useState({
        searchText: "",
        data: [],
        filteredData: []
    });
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []),
    );
    const dispatch = useDispatch();
    const searchData = (search: string) => {
        setNotesData({ ...notesData, searchText: search });
        let filteredData = notes.data.filter((item: Note) => item.title.toUpperCase().includes(search.toUpperCase()));
        console.log('filtered', filteredData)
        setNotesData({ ...notesData, filteredData });
        //let { sort, selectedCategory } = notes;
        dispatch(getNotes());
        //console.log(bindNotesToCategories(notes.data, notes.dataCategory))
    }
    const debounceFn = useCallback(_.debounce(searchData, 200), []);
    const [homeState, setHomeState] = useState({
        _ModalVisible: false,
        search: '',
        notes: []
    })
    const setModalVisibility = (bool: boolean) => {
        setHomeState({ ...homeState, _ModalVisible: bool });
    }
    const fetchData = () => {
        // let { sort, search, selectedCategory } = notes;
        //dispatch(getNotes({ sort, search, selectedCategory }))
        dispatch(getNotes());
        dispatch(getCategories());
        setNotesData({ ...notesData, data: notes.data });

    }
    // const bindNotesToCategories = async (notesArray: Note[], categoryArray: Category[]): Promise<Category> => {
    //     const bindedCategory = categoryArray.find((category) => notesArray.find((note: Note) => category.name === note.category));
    //     return bindedCategory;
    // }
    const loadMore = () => {
        let { sort, nextPage, search, selectedCategory } = notes;
        dispatch(getMoreNotes({ sort, search, nextPage, selectedCategory }));
    }

    const _onRefresh = () => {
        let selectedCategory = "";
        let sort = "";
        let search = "";
        dispatch(getNotes());
        dispatch(getCategories());
    }
    const _keyExtractor = (item: Note, index) => String(index);

    return (

        <View style={styles.container}>
            <View>
                <Button onPress={() => navigation.navigate('LogIn')}>Log-in</Button>
            </View>
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
                                data={notesData.filteredData && notesData.filteredData.length > 0 ? notesData.filteredData : notes.data}
                                keyExtractor={_keyExtractor}
                                numColumns={2}
                                onRefresh={_onRefresh}
                                refreshing={notes.isLoading}
                                renderItem={({ item }) => <Card title={item.title} category={item.categories.length > 0 ? item.categories[0].name : ''} note={item.note} navigation={navigation} key={item.id} cardColor={item.categories.length > 0 ? item.categories[0].cardColor: '#000000'} created_at={item.created_at} />}
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


