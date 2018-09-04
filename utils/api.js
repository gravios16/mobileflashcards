import { AsyncStorage } from 'react-native'

import { DECKS_STORAGE_KEY, formatDeckResults } from './_defaultDecks'

export function fetchDeckResults () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitDeckCard ({ key, deckCard }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
      ...data,
      [key]: {
        ...data[key],
        questions: data[key].questions.concat(deckCard)
      }
    }))
  })
}