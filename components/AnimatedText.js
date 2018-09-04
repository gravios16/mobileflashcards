import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { orange, white, gray } from '../utils/colors'

class AnimatedText extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  action = () => {
    const { bounceValue } = this.state
    const { toDetail } = this.props

    Animated.timing(bounceValue, { duration: 150, toValue: 2.3}).start(()=> {
      Animated.timing(bounceValue, { duration: 30, toValue: 1}).start(() => {
        toDetail()
      })
    })
  }

  render () {
    const { bounceValue } = this.state
    const { deck } = this.props
    return (
      <TouchableOpacity
        style={styles.deck}
        onPress={() => this.action()}
      >
        <Animated.Text style={ [styles.deckName, { transform: [{scale: bounceValue}] }] }>
          {deck.title}
        </Animated.Text>
        <Text style={styles.deckCardNums}>({deck.questions.length} cards)</Text>
      </TouchableOpacity>
    )
  }
}

export default AnimatedText

const styles = StyleSheet.create({
  deckName: {
    fontSize: 24,
    color: orange,
    marginBottom: 6
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
  deckCardNums: {
    color: gray
  },
})