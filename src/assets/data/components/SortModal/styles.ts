import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    contentContainer: {
        top:50,
        flex:1,
    },
    contentSide:{
        flex:1,
        opacity:0
    },
    modal:{
        backgroundColor:'#FFF',
        position:'absolute',
        right:5,
        top:5,
        alignContent:'center',
        justifyContent:'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderRadius:3
    },
    text:{
        left:3,
        fontSize:15,
        color:'#000'
    },
    buttonView:{
        padding:10,
        margin:10
    }

  });
  export default styles;