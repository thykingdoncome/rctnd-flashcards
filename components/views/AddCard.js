import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import Styles from "../../utils/styles";
import { AddCardToDeck } from "../../redux/actions";
import { AddCardToDeckStorage } from "../../utils/api";

const AddCard = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { deck } = route.params;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    dispatch(AddCardToDeck(deck.title, { answer: answer, question: question }));
    AddCardToDeckStorage(deck.title, { answer: answer, question: question });
    navigation.navigate("Deck", { deck: deck.title });
  };
  
  return (
    <View style={Styles.main}>
      <Text style={Styles.deckTexts}>Title: {deck.title}</Text>
      <View style={Styles.VerticalAlignCenter}>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={Styles.textInput}
            value={question}
            placeholder="Question"
            onChangeText={(text) => setQuestion(text)}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={Styles.textInput}
            value={answer}
            placeholder="Answer"
            onChangeText={(text) => setAnswer(text)}
          />
        </View>
      </View>
      <TouchableOpacity style={{ marginBottom: 30 }} onPress={handleSubmit}>
        <Text style={Styles.button}>Create Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCard;
