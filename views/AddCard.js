import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'
import { blue, white, grey } from '../utils/colors'

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
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.addCardTitle}>{deck.title}</Text>
          <TextInput style={styles.addCardInput} editable={true} maxLength={100} placeholder="Enter question..." onChangeText={(question) => this.setState({question})}/>
          <TextInput style={styles.addCardInputMulti} editable={true} maxLength={200} multiline={true} placeholder="Enter answer..." onChangeText={(answer) => this.setState({answer})}/>
        </View>
        
        <View style={styles.addCardActionsContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  formContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  addCardTitle: {
    color: blue,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addCardInput:{
    width: 300,
    borderBottomWidth: 1,
    borderColor: blue,
    fontSize: 20,
    padding: 4,
    marginTop: 48,
    alignSelf: 'center'
  },
  addCardInputMulti:{
    width: 300,
    height: 120,
    borderWidth: 1,
    borderColor: blue,
    fontSize: 16,
    padding: 4,
    marginTop: 48,
    alignSelf: 'center',
    borderRadius: 5
  },
  addCardActionsContainer:{
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