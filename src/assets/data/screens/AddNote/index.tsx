import React, { Component, useCallback, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { getCategories, insertNotes } from '../../public/redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Modal, Portal, Text, Button } from 'react-native-paper';
interface NoteProperties {
    categories: CategoryProperties[];
    description: string;
    note: string;
    title: string;
}
interface CategoryProperties {
    id?: string;
    name: string;
    cardColor?: string;
}

const AddNote = ({ navigation, ...props }) => {
    const dispatch = useDispatch();
    const category_text = 'Add Category';
    const notes = useSelector((state: any) => state.notes);
    const [categories, setCategories] = useState<CategoryProperties[]>(notes.dataCategory);
    const [category, setSelectedCategory] = useState(null);
    const [noteData, setNote] = useState<NoteProperties>(notes);
    const dropdownController = useRef(null)
    const searchRef = useRef(null)

    useFocusEffect(
        React.useCallback(() => {
            if(category === category_text){
                    //set Modal true and add category
            }
            console.log(category)
        }, [category]),
    );

    const insertNote = () => {
        const { title, note, categories } = noteData;
        if (title !== '' && note != '' && categories.length > 0) {
            dispatch(insertNotes(noteData))
            navigation.navigate('Home');
        }
    }
    const categoriesMap = () => {
        console.log(categories)
        if (!categories) return;
        const mappedCategories = categories.map((category: CategoryProperties, key: number) => ({
            id: category.id,
            title: category.name,
        }
        ))
        return [{id:"0", title: category_text}, ...mappedCategories];
    }

    const onOpenSuggestionsList = useCallback(isOpened => {}, [])

    const searchCategories = (searchText: string) => {
        if (typeof searchText !== 'string' || searchText.length < 3 || (!categories || categories.length === 0)) {
            return;
        }
        console.log('search',categories)
        const filteredCategories = categories.filter((category: CategoryProperties) => category.name.toLowerCase().includes(searchText.toLowerCase()))
        // .map((category: CategoryProperties) => ({
        //     ...category,
        //     id: category.id,
        //     title: category.name,
        // }));
        setCategories(filteredCategories);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a new note</Text>
            <TextInput placeholder="Enter your title here" onChangeText={(text) => setNote({ ...noteData, title: text })} />
            <TextInput placeholder="Enter your description here" onChangeText={(text) => setNote({ ...noteData, description: text })} />
            <TextInput placeholder="Enter your note here" multiline={true} onChangeText={(text) => setNote({ ...noteData, note: text })} />
            <AutocompleteDropdown controller={controller => {dropdownController.current = controller}} onOpenSuggestionsList={onOpenSuggestionsList} 
            ref={searchRef} onChangeText={searchCategories} onSelectItem={item => {
                item && setSelectedCategory(item.title)
              }} dataSet={categoriesMap()} useFilter={false} />
            <Button icon="note" mode="contained" onPress={() => insertNote()}>
                Add Note
            </Button>

        </View>
    );
}


export default AddNote;