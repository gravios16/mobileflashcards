import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native'
import { fetchDeckResults } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import AnimatedText from './AnimatedText'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    fetchDeckResults()
    .then((decks) => dispatch(receiveDecks(decks)))
  }

  toDetail = (key) => {
    return () => {
        this.props.navigation.navigate(
        'DeckDetail',
        { deckId: key }
      )
    }
  }

  render () {

    const { decks } = this.props

    return (
      <ScrollView style={styles.deckContainer}>
        {Object.keys(decks).map((key) => (
          <AnimatedText key={key} deck={decks[key]} toDetail={this.toDetail(key)}/>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)