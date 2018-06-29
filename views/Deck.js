import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, grey } from '../utils/colors'

class Deck extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params
    return {title: deckTitle}
  }

  render () {

    const { deck, navigateToStartQuiz, navigateToAddCard } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.quizMetaContainer}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.quizMeta}>{deck.questions && deck.questions.length} {deck.questions && deck.questions.length === 1 ? "Card": "Cards"}</Text>
        </View>
        <View style={styles.quizActionsContainer}>
          {(deck.questions && deck.questions.length > 0) &&<TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => navigateToStartQuiz(deck.title)}>
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Start Quiz</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigateToAddCard(deck.title)}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Add Card</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deckTitle: {
    color: blue,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  quizMetaContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quizActionsContainer:{
    padding: 48
  },
  quizMeta: {
    color: grey,
    fontSize: 24,
    paddingTop: 24
  },
  button:{
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 5,
    width: 200,
    alignSelf: 'center',
    padding: 10,
  },
  buttonPrimary: {
    backgroundColor: blue,
    marginBottom: 24
  },
  buttonSecondary: {
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  },
  buttonTextPrimary: {
    color: white,
  },
  buttonTextSecondary: {
    color: blue,
  }
});