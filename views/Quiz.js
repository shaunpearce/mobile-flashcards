import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {setLocalNotification, clearLocalNotification} from '../utils/notifications'
import { blue, white, grey, red, green, lightBlue } from '../utils/colors'
import Card from '../components/Card'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'


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

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  render () {

    const { deck } = this.props
    const card = deck.questions[this.state.currentQuestion]
    const scorePct = Math.floor((this.state.currenctScore / deck.questions.length) * 100)
    const progress =  (this.state.currentQuestion + 1) + "/" + deck.questions.length

    return (
      deck.questions && this.state.currentQuestion !== deck.questions.length ?
         <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Card card={card} currentScore={scorePct} progress={progress}/>
          </View>
          <View style={styles.answerButtonsContainer}>
            <TouchableOpacity style={[styles.answerButton, styles.incorrectButton]} onPress={() => this.onIncorrect()}>
             <MaterialCommunityIcons style={styles.buttonIcon} name='close-circle-outline' size={70} color={red} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerButton, styles.correctButton]} onPress={() => this.onCorrect()}>
              <MaterialCommunityIcons style={styles.buttonIcon} name='check-circle-outline' size={70} color={green} />
            </TouchableOpacity>
          </View>
          </View>
          :
          <View style={styles.container}>
            <View style={styles.resultsContainer}>
              {scorePct > 49 ? <Ionicons name={'ios-happy-outline'} size={100} color={green} /> : <Ionicons name={'ios-sad-outline'} size={100} color={red}/>}
              <Text style={styles.quizMeta}>Your score:</Text>
              <Text style={[styles.scoreText, scorePct > 49 ? styles.scoreCorrectText : styles.scoreIncorrectText ]}>{scorePct} %</Text>
              
            </View>
            <View style={styles.resultActionsContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => this.props.navigation.goBack()}>
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => this.onRestartQuiz()}>
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Restart</Text>
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  cardContainer:{
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
  },
  buttonSecondary: {
    marginBottom: 24
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
  answerButtonsContainer:{
    backgroundColor: lightBlue,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 16,
    paddingBottom: 16,
  },
  answerButton:{
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrectButton:{
    //backgroundColor: red,
  },
  correctButton:{
    //backgroundColor: green
  },
  buttonIcon:{
    marginTop: 3
  },
  resultsContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultActionsContainer:{
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
  quizMeta: {
    color: grey,
    fontSize: 24,
    paddingTop: 24
  },
  scoreText: {
    color: blue,
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12
  },
  scoreCorrectText:{
    color: green
  },
  scoreIncorrectText:{
    color: red
  },
  
});