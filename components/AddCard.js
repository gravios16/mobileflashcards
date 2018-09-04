import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native'
import { orange, white } from '../utils/colors'
import { addDeckCard } from '../actions'
import { submitDeckCard } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {

  static navigationOptions = ({navigation}) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId + ': AddCard'
    }
  }

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { deckId } = this.props.navigation.state.params
    const deckCard = this.state

    this.props.dispatch(addDeckCard(deckId, deckCard))

    this.setState(() => ({
      question: '',
      answer: ''
    }))

    this.props.navigation.dispatch(NavigationActions.back())

    submitDeckCard({
      key: deckId,
      deckCard
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <Text style={styles.label}>Answer:</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: orange,
    fontSize: 25
  },
  inputText: {
    height: 40,
    borderColor:
    'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
    marginBottom: 30
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    padding: 20
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
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})