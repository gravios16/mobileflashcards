import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { white, orange, gray, green, red } from '../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

  static navigationOptions = ({navigation}) => {
    const { deckId } = navigation.state.params

    return {
      title: 'Quiz: ' + deckId
    }
  }

  state = {
    quizPageCount: 1,
    correctsCount: 0,
    cardIsFlipped: false,
    finished: false
  }

  flipCard = () => {
    this.setState((oldState) => ({
      cardIsFlipped: !oldState.cardIsFlipped
    }))
  }

  answer = (correct) => {
    const { quizPageCount } = this.state
    const { deckData } = this.props
    const totalQuestions = deckData.questions.length

    this.setState((oldState) => ({
      quizPageCount: totalQuestions == quizPageCount ? totalQuestions : oldState.quizPageCount + 1,
      correctsCount: correct === true ? oldState.correctsCount + 1 : oldState.correctsCount,
      cardIsFlipped: false,
      finished: totalQuestions == quizPageCount
    }))

    if ( totalQuestions == quizPageCount ) {
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  render () {
    const { quizPageCount, cardIsFlipped, finished, correctsCount } = this.state
    const { deckData } = this.props

    const totalQuestions = deckData.questions.length
    const currentQuestion = deckData.questions[quizPageCount-1].question
    const currentAnswer = deckData.questions[quizPageCount-1].answer

    if (finished) {
      const score = Math.round(correctsCount/totalQuestions * 100)

      return (
        <View style={[styles.container, {backgroundColor: white}]}>
          <View style={styles.cardContainer}>
            <Text style={styles.title}>Finish!</Text>
            <Text style={styles.label}>Your Score: {correctsCount}/{totalQuestions}, {score}% Good</Text>
          </View>
        </View>
      )
    }

    return (

      <View style={[styles.container, {backgroundColor: this.state.cardIsFlipped == true ? 'rgba(255, 255, 255, 0.4)' : white}]}>
        <Text style={styles.label}>{quizPageCount}/{totalQuestions}</Text>
        <View style={styles.cardContainer}>
          { cardIsFlipped == true
            ? <Text style={styles.title}>{currentAnswer}</Text>
            : <Text style={styles.title}>{currentQuestion}</Text>
          }
          { cardIsFlipped == true
            ? <TouchableOpacity onPress={this.flipCard}>
                <Text style={styles.label}>(Question)</Text>
              </TouchableOpacity>
            : <TouchableOpacity onPress={this.flipCard}>
                <Text style={styles.label}>(Answer)</Text>
              </TouchableOpacity>
          }
        </View>

        <View>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: green}]}
            onPress={() => {this.answer(true)}}
          >
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: red}]}
            onPress={() => {this.answer(false)}}
          >
            <Text style={styles.submitBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  label: {
    color: gray,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  title: {
    color: orange,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 25
  },
  flipOption:{
    color: gray,
    fontSize: 15
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 20
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})