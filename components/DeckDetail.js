import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { white, orange, gray, green } from '../utils/colors'
import { connect } from 'react-redux'

class DeckDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const { deckId } = navigation.state.params
    return {
      title: 'Deck: ' + deckId
    }
  }

  render () {

    const { deckData } = this.props

    return (
      <View style={styles.deck}>
        <Text style={styles.deckName}>{deckData.title}</Text>
        <Text style={styles.deckCardNums}>({deckData.questions.length} cards)</Text>
        <TouchableOpacity style={styles.submitBtn}
          onPress={ () => this.props.navigation.navigate(
            'AddCard',
            { deckId: deckData.deckId }
          )}
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.submitBtn, {backgroundColor: green}]}
          onPress={ () => this.props.navigation.navigate(
            'Quiz',
            { deckId: deckData.deckId }
          )}
        >
          <Text style={styles.submitBtnText}>Start a Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}) {
  return {
    deckData: {
      deckId: [navigation.state.params.deckId],
      ...decks[navigation.state.params.deckId]
    }
  }
}

export default connect(mapStateToProps)(DeckDetail)

const styles = StyleSheet.create({
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
    fontSize: 32,
    color: orange,
    marginBottom: 6
  },
  deckCardNums: {
    color: gray,
    fontSize: 18,
    marginBottom: 20
  },
  submitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})