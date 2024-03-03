import React, {  useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';
import categoriesDummyData from '../../categories.json';

const Note = ({navigation, ...props }) => {
    const [note, setNote] = useState({
        createdAt   : new Date(props.created_at),
        monthList   : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    })
    const categoryIdToCardColorMap = (categoryName: string): string =>{
        
        return categoriesDummyData.find(c => c.name === categoryName).cardColor;
    }
    return (
        <View style={styles.card}>
            <TouchableOpacity
                //onPress={() => { navigation.navigate('EditNote', data)}}
                //onLongPress={()=>{this.deleteHandler(data)}}
                style={[styles.card,{backgroundColor: categoryIdToCardColorMap(props.category)}]}>

                <Text style={styles.create}>{note.createdAt.getDate()} {note.monthList[note.createdAt.getMonth()]}</Text>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                <Text numberOfLines={1} style={styles.category}>{props.category}</Text>
                <Text numberOfLines={4} style={styles.note}>{props.note}</Text>
            
            </TouchableOpacity>
        </View>
    );
}



export default Note;