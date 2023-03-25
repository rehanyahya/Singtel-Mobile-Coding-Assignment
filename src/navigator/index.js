import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Menu, Puzzle, Login, Leaderboard} from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const screenOptions = {
    headerStyle: {
      // backgroundColor: '#442445',
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerShadowVisible: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Menu'} screenOptions={screenOptions}>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Puzzle"
          component={Puzzle}
          options={{title: '', headerTintColor: 'black'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '', headerTintColor: 'black'}}
        />
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{title: '', headerTintColor: 'black'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
