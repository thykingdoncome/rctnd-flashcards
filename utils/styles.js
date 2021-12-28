import { StyleSheet } from "react-native";
import { white, red, blue, lightBlue, greyishBlue } from "./colors";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    margin: "auto",
    width: "100%",
    alignSelf: "center",
  },
  decks: {
    backgroundColor: greyishBlue,
    marginTop: 10,
    height: 80,
    borderRadius: 2,
  },
  deckTexts: {
    fontSize: 25,
    textAlign: "center",
  },
  cards: {
    fontSize: 15,
    textAlign: "center",
  },
  main: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
  },
  DeckHeader: {
    fontSize: 20,
    textAlign: "center",
  },
  VerticalAlignCenter: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
  },
  deckOptions: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    borderColor: lightBlue,
    borderWidth: 2,
    width: 150,
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    color: blue,
    alignSelf: "center",
  },
  delete: {
    color: red,
    textAlign: "center",
    padding: 10,
  },
  subButton: {
    textAlign: "center",
    marginTop: 10,
    color: blue,
    fontSize: 20,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Styles;
