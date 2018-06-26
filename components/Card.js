import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

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

    const { card } = this.props

    return (
      <View>
        <TouchableOpacity onPress={() => this.onFlipCard()}>
          {this.state.showQuestion ?
            <Text>{card.question}</Text>:
            <Text>{card.answer}</Text>
          }
        </TouchableOpacity>
        
      </View>
    )
  }
}

export default Card