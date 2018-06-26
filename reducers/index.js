import { LOAD_DECKS, ADD_DECK, ADD_CARD } from '../actions'

const initialState = {
  test: 1,
}

function app (state = initialState, action) {
  switch (action.type) {
    case LOAD_DECKS:
      {
        return {
          ...state,
          decks:{
            ...state.decks,
            ...action.decks
          }
        }
      }

    case ADD_DECK:
      {
        return {
          ...state,
          decks:{
            ...state.decks,
            [action.deckTitle]: {
              title: action.deckTitle,
              questions: []
            }
          }
        }
      }

    case ADD_CARD:
      {
        return {
          ...state,
          decks: {
            ...state.decks,
            [action.deckTitle]: {
              ...state.decks[action.deckTitle],
              questions: [
                ...state.decks[action.deckTitle].questions,
                {...action.card}
              ]
            }
          }
          
        }
      }

    default :
      return state
  }
}

export default app