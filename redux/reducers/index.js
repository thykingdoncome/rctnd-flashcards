import { ADD_DECK, GET_DECKS, ADD_CARD } from "../../redux/actions";

export default Deck = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case GET_DECKS:
      return action.decks;
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat([action.card]),
        },
      };
    default:
      return state;
  }
};
