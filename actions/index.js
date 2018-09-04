export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addDeckCard (deckId, deckCard) {
  return {
    type: ADD_DECK_CARD,
    deckId,
    deckCard
  }
}