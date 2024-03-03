import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  card: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      elevation: 10,
      shadowRadius: 5,
      shadowOpacity: 1.0,
      borderRadius: 5,
      margin:20,
      paddingRight:20,
      width:138,
      height:136,
      color: '#fff',
  },
  create:{
      fontSize:11,
      alignSelf:'flex-end',
      color: '#fff',
      right:-10,
      top:5
  },
  title:{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      top:10,
      left:10,
  },
  category:{
      color: '#FFFBFB',
      fontSize: 10,
      top:8,
      left:10
  },
  note:{
      color: '#fff',
      fontSize:12,
      top:10,
      left:10
  }
});
  export default styles;