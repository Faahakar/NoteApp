import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNote from './src/assets/data/screens/AddNote';
import HomeScreen from './src/assets/data/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './src/assets/data/public/redux/store';
import LogInUser from './src/assets/data/screens/SignIn';
import { PaperProvider } from 'react-native-paper';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>

    <Provider store={store}>
    <NavigationContainer>
    <AutocompleteDropdownContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="LogIn" component={LogInUser} />
      </Stack.Navigator>
      </AutocompleteDropdownContextProvider>
    </NavigationContainer>
    </Provider>

    </PaperProvider>
  );
}

export default App;

