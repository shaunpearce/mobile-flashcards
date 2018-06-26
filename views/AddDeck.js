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
      this.toHome()
    }
  }

  reset = () => {
    this.setState({
      title: ""
    })
    this.toHome()
  }

  toHome() {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render () {
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput editable={true} placeholder="Deck Title" onChangeText={(title) => this.setState({title})}/>
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

function mapStateToProps(decks) {
  return {decks}
}
export default connect(mapStateToProps, {addDeck})(AddDeck)