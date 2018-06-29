import React, { Component } from 'react'
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native'
import { blue, white, grey } from '../utils/colors'
import { Entypo } from '@expo/vector-icons'

class Card extends Component {

  state = {
    showQuestion: true
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if ( prevState.showQuestion !== true) {
      return { 
        showQuestion: true
      }
    }
    else return null;
  }
  
  onFlipCard(){
    this.setState({ 
      showQuestion: !this.state.showQuestion
    })
  }

  render () {

    const { card, currentScore, progress } = this.props

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => this.onFlipCard()}>
          {this.state.showQuestion ?
            <View style={styles.cardContent}>
              <View style={styles.flipButtonContainer}>
                <Text style={styles.flipButtonText}>Show Answer</Text>
                <Entypo name='cycle' size={16} color={blue} />
              </View>
              <Text style={[styles.cardText, styles.questionText]}>{card.question}?</Text>
            </View>
            :
            <View style={styles.cardContent}>
              <View style={styles.flipButtonContainer}>
                <Text style={styles.flipButtonText}>Show Question</Text>
                <Entypo name='cycle' size={16} color={blue} />
              </View>
              <Text style={styles.cardText}>{card.answer}</Text>
            </View>
          }
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{progress}</Text>
            <Text style={styles.progressText}>{currentScore}%</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card

const styles = StyleSheet.create({
  cardContainer:{
    flex: 1,
    alignSelf: 'stretch',
  },
  card: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    margin: 32,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
  },
  cardContent:{
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  flipButtonContainer:{
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flipButtonText: {
    color: blue,
    fontSize: 12,
    marginRight: 8,
    fontWeight: '600'
  },
  cardText:{
    fontSize: 20,
    textAlign: 'center',
    color: blue
  }, 
  questionText:{
    fontWeight: 'bold'
  },
  progressContainer:{
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  progressText:{
    color: grey,
    fontSize: 12
  }
});