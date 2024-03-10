import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      paddingTop:0,
      justifyContent: 'center',
      backgroundColor: '#FAFEFF',
      alignItems:'center',
      flex: 1
    },
    activityIndicator: {
      paddingTop: 300,
      position : 'absolute',
    },
    noteList: {
      marginTop: 70,
      paddingBottom:100
    },
    input: {
        marginHorizontal: 20,
        height: 37,
        borderColor: '#999',
        borderWidth: 0,
        color:'#999'
      },
      search: {
        padding:0,
        marginTop:20,
        marginHorizontal:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderColor: '#999',
        borderWidth: 0,
        borderRadius:25,
        backgroundColor:'#FFF',
        opacity:0.9,
        width:304,
        top:0,
        zIndex:1
      }
  });

  export default styles;