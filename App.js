import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Entypo } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/notifications'
import Decks from './views/Decks'
import Deck from './views/Deck'
import Quiz from './views/Quiz'
import AddDeck from './views/AddDeck'
import AddCard from './views/AddCard'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
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
    headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      headerBackTitle: null,
      title: "Add Card"
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
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple,
        height: 60,
      },
      headerBackTitle: null,
      title: "Mobile Flashcards"
    }
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

  componentDidMount() {
    setLocalNotification()
  }

 

  render() {
    console.log(this.props)
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={purple} barStyle="light-content" />
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
