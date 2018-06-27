import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {

  state = {
    title: ""
  }

  submit = () => {
    const { title } = this.state
    const { addDeck } = this.props
    if (title) {
      addDeck(title)
      saveDeckTitle(title)
      this.reset()
    }
  }

  reset = () => {
    this.setState({
      title: ""
    })
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render () {
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput editable={true} placeholder="Deck Title" onChangeText={(title) => this.setState({title})} value={this.state.title}/>
        <TouchableOpacity onPress={this.reset}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.submit}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch, {navigation}) => {
  return {
    addDeck: (deckTitle) => dispatch(addDeck(deckTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)