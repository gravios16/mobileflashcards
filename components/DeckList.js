import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { gray, orange, white } from '../utils/colors'
import { fetchDeckResults } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    fetchDeckResults()
    .then((decks) => dispatch(receiveDecks(decks)))
  }

  render () {

    const { decks } = this.props

    return (
      <ScrollView style={styles.deckContainer}>
        {Object.keys(decks).map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.deck}
              onPress={ () => this.props.navigation.navigate(
                'DeckDetail',
                { deckId: key }
              )}
            >
              <Text style={styles.deckName}>{decks[key].title}</Text>
              <Text style={styles.deckCardNums}>({decks[key].questions.length} cards)</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1
  },
  deck: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    flex: 1,
    margin: 10,
    alignSelf: 'stretch',
    backgroundColor: white,
    borderRadius: 16,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
  },
  deckName: {
    fontSize: 24,
    color: orange,
    marginBottom: 6
  },
  deckCardNums: {
    color: gray
  },
  reset: {
    textAlign: 'center',
    color: gray
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)