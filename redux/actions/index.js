export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";
export const ADD_CARD = "ADD_CARD";

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};

export const getDecks = (decks) => {
  return { type: GET_DECKS, decks };
};

export const DeleteDeck = (id) => {
  return {
    type: REMOVE_DECK,
    id,
  };
};

export const AddCardToDeck = (deck, card) => {
  return {
    type: ADD_CARD,
    deck,
    card,
  };
};
