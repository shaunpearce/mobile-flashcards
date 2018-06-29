import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { blue, white, grey } from '../utils/colors'

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
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.addDeckTitle}>Add Deck</Text>
          <TextInput style={styles.addDeckInput} color={blue} editable={true} placeholder="Deck Title" onChangeText={(title) => this.setState({title})} value={this.state.title}/>
        </View>
        <View style={styles.addDeckActionsContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={this.submit}>
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={this.reset}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cancel</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  formContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  addDeckTitle: {
    color: blue,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addDeckInput:{
    width: 200,
    borderBottomWidth: 1,
    borderColor: blue,
    fontSize: 20,
    padding: 4,
    marginTop: 48,
    alignSelf: 'center'
  },
  addDeckActionsContainer:{
    padding: 48
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
  },
})