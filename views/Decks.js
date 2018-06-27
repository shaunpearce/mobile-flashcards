import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import { loadDecks } from '../actions'
import { purple, white } from '../utils/colors'


class Decks extends Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    const {loadDecks} = this.props
    getDecks().then((decks) => loadDecks(decks)).then(() => this.setState(() => ({loaded: true})))
  }

  keyExtractor = (item) => item.title;

  renderItem = ({item, index}) => {
    const { navigate } = this.props.navigation
    return (
      <View style={[styles.itemContainer, { borderTopWidth: index === 0 ? 1 : 0}]}>
        <TouchableOpacity style={styles.item} onPress={() => navigate('Deck', { deckTitle: item.title })}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () { 

    const { decks } = this.props
    
    const listOfDecks = decks && Object.values(decks)
   
    return (
      <View style={styles.container}>
        {
          this.state.loaded ?
          <FlatList data={listOfDecks} keyExtractor={this.keyExtractor} extraData={this.state} renderItem={this.renderItem}/>:
          <AppLoading/>   
        } 
      </View>
    )

  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch, {navigation}) => {
  return {
    loadDecks: (decks) => dispatch(loadDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: purple,
    borderTopColor: purple
  },
  item: {
   flex: 1,
   alignSelf: 'stretch',
  },
  itemText: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 20,
   }
});