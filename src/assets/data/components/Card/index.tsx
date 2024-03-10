import React, {  useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const Note = ({navigation, ...props }) => {
    const [note, setNote] = useState({
        createdAt   : props.created_at,
        monthList   : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    })
    const date =  new Date(props.created_at).toLocaleDateString('pt-BR');
    return (
        <View style={styles.card}>
            <TouchableOpacity
                //onPress={() => { navigation.navigate('EditNote', data)}}
                //onLongPress={()=>{this.deleteHandler(data)}}
                style={[styles.card,{backgroundColor: props.cardColor? props.cardColor: '#000000'}]}>

                <Text style={styles.create}>{date}</Text>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                <Text numberOfLines={1} style={styles.category}>{props.category}</Text>
                <Text numberOfLines={4} style={styles.note}>{props.note}</Text>
            
            </TouchableOpacity>
        </View>
    );
}



export default Note;