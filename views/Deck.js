import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params
    return {title: deckTitle}
  }

  render () {

    const { deck, navigateToStartQuiz, navigateToAddCard } = this.props
    console.log("Deck: ", deck)

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions && deck.questions.length}</Text>
        <TouchableOpacity onPress={() => navigateToAddCard(deck.title)}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToStartQuiz(deck.title)}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ( {decks}, {navigation}) => {
  const { deckTitle } = navigation.state.params
  return {
    deck: decks[deckTitle] || {},
    decks
  }
}

const mapDispatchToProps = (dispatch, {navigation}) => {

  return {
    navigateToStartQuiz: (deckTitle) => navigation.navigate('Quiz', {deckTitle: deckTitle}),
    navigateToAddCard: (deckTitle) => navigation.navigate('AddCard', {deckTitle: deckTitle}),
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Deck)