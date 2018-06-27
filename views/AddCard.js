import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

class AddCard extends Component {

  submit = () => {
    const {question, answer} = this.state
    const {addCard, deck, goBack} = this.props
    if (question && answer) {
      addCard(deck.title, {question, answer}) //update Redux
      addCardToDeck(deck.title, {question, answer}) //update db
      goBack()
    }
  }

  reset = () => {
    this.setState({question: '', answer: ''})
    this.props.goBack()
  }

  render () {

    const {deck} = this.props

    return (
      <View>
        <Text>{deck.title}</Text>
        <TextInput editable={true} maxLength={100} placeholder="Enter the question here" onChangeText={(question) => this.setState({question})}/>
        <TextInput editable={true} maxLength={200} multiline={true} placeholder="Enter the answer here" onChangeText={(answer) => this.setState({answer})}/>
        <TouchableOpacity onPress={this.submit}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = ({decks}, {navigation}) => {

  const {deckTitle} = navigation.state.params
  
  return {
    deck: decks[deckTitle] || {}
  }
}

const mapDispatchToProps = (dispatch, {navigation}) => {

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)