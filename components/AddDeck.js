import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { orange, white } from '../utils/colors'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    const { title } = this.state

    this.props.dispatch(addDeck({
      title,
      questions: []
    }))

    this.setState(() => ({
      title: ''
    }))

    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }))

    submitDeck({
      key: title,
      deck: {
        title: title,
        questions: []
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 25,
    color: orange,
    margin: 10,
    textAlign: 'center',
    marginBottom: 25
  },
  inputText: {
    height: 40,
    borderColor:
    'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
    marginBottom: 25
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
  },
})