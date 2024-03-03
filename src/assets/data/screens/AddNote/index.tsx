import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import categoryData from '../../categories.json';
import { insertNotes } from '../../public/redux/slices';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
interface NoteProperties {
    category_id: number;
    category: string;
    description: string;
    note: string;
    title: string;
}
interface CategoryProperties {
    id: number;
    name: string;
}


const AddNote = ({ navigation, ...props }) => {
    const dispatch = useDispatch();
    //const notes = props.notes;
    const categories: CategoryProperties[] = categoryData;
    const [content, setContent] = useState<string>('');
    const [noteData, setNote] = useState<NoteProperties>({
        category_id: 0,
        category: '',
        description: '',
        note: '',
        title: ''
    });

    useFocusEffect(
        React.useCallback(() => {
            setDefaultCategory();
        }, []),
    );


    const setDefaultCategory = () => {
        setNote({
            ...noteData,
            category_id: categories[0].id,
            category: categories[0].name
        })
    }

    const updateCategory = (input: string) => {
        setNote({ ...noteData, category: input })
        {
            categories.map((category: CategoryProperties) => {
                if (category.name == input) setNote({ ...noteData, category_id: category.id })
            })
        }
    }

    const insertNote = () => {
        const { title, note, category, category_id } = noteData;
        if (title !== '' && category !== '') {
            dispatch(insertNotes(noteData))
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a new note</Text>
            <TextInput placeholder="Enter your title here" onChangeText={(text) => setNote({ ...noteData, title: text })} />
            <TextInput placeholder="Enter your description here" onChangeText={(text) => setNote({ ...noteData, description: text })} />
            <TextInput placeholder="Enter your note here" multiline={true} onChangeText={(text) => setNote({ ...noteData, description: text })} />
            <View>
                <Picker selectedValue={noteData.category} onValueChange={updateCategory}>
                    {categories.map((category: CategoryProperties, key: number) =>
                        <Picker.Item key={key} label={category.name} value={category.name} />)}
                </Picker>
                <Button icon="note" mode="contained" onPress={() => insertNote()}>
                    Add Note
                </Button>
            </View>
        </View>
    );
}


export default AddNote;