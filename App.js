import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import Decks from './views/Decks'
import Deck from './views/Deck'
import Quiz from './views/Quiz'
import AddDeck from './views/AddDeck'
import AddCard from './views/AddCard'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: purple, 
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck:{
    screen: Deck,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      headerBackTitle: null,
    }
  }
  
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
