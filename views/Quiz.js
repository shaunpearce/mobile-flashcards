import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Card from '../components/Card'

class Quiz extends Component {

  state = {
    currentQuestion: 0,
    currenctScore: 0
  }

  static navigationOptions = ({navigation}) => {
    const { deckTitle } = navigation.state.params
    return {title: deckTitle}
  }

  onCorrect(){
    this.setState({ 
      currentQuestion: this.state.currentQuestion + 1,
      currenctScore: this.state.currenctScore + 1,
    })

  }

  onIncorrect(){
    this.setState({ 
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  onRestartQuiz(){
    this.setState({ 
      currentQuestion: 0,
      currenctScore: 0
    })
  }

  render () {

    const { deck } = this.props
    const card = deck.questions[this.state.currentQuestion]

    return (
      deck.questions && this.state.currentQuestion !== deck.questions.length ?
         <View>
          <Card card={card}/>
          <TouchableOpacity onPress={() => this.onCorrect()}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onIncorrect()}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
          </View>
          :
          <View>
            <Text>{Math.floor((this.state.currenctScore / deck.questions.length) * 100)} %</Text>
            <TouchableOpacity onPress={() => this.onRestartQuiz()}>
              <Text>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text>Done</Text>
            </TouchableOpacity>

          </View>
    )
  }
}

const mapStateToProps =({decks}, {navigation}) => {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

export default connect(mapStateToProps, null)(Quiz)