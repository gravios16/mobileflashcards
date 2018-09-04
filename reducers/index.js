import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck
        }
      }
     case ADD_DECK_CARD :
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat(action.deckCard)
        }
      }
    default :
      return state
  }
}

export default decks